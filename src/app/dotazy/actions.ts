"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitQuestion(formData: FormData) {
  const author_name = formData.get("author_name") as string;
  const author_email = formData.get("author_email") as string;
  const content = formData.get("content") as string;
  const botField = formData.get("bot_field") as string;

  // Honeypot ochrana - pokud to robot vyplní, tváříme se že to prošlo, ale nic neuložíme
  if (botField) {
    return { success: true };
  }

  // Cloudflare Turnstile ověření (na straně serveru)
  const turnstileToken = formData.get("cf-turnstile-response") as string;
  if (!turnstileToken) {
    return { error: "Prosím potvrďte, že nejste robot (Turnstile)." };
  }

  // Ověření proti Cloudflare API
  try {
    const verifyResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: '0x4AAAAAADEc1wdJq8dQGspeA0OQ7Oihl_o',
        response: turnstileToken,
      }),
    });
    
    const verification = await verifyResponse.json();
    if (!verification.success) {
      return { error: "Ověření proti botům selhalo. Zkuste to znovu." };
    }
  } catch (err) {
    console.error("Turnstile verification error:", err);
    // V případě chyby API Cloudflare můžeme buď pustit (aby web fungoval), 
    // nebo zastavit. Zde raději zastavíme.
    return { error: "Chyba při komunikaci s ověřovací službou." };
  }

  if (!author_name || !content) {
    return { error: "Jméno a text dotazu jsou povinné údaje." };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("questions").insert({
    author_name,
    author_email: author_email || null,
    content,
    status: "pending", // Výchozí stav, čeká na schválení/odpověď
  });

  if (error) {
    console.error("Chyba při odesílání dotazu:", error);
    return { error: "Nepodařilo se odeslat dotaz. Zkuste to prosím později." };
  }

  // Nemusíme hned revalidovat zobrazení, protože dotaz čeká na schválení
  // revalidatePath("/dotazy");

  return { success: true };
}
