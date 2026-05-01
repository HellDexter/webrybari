import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";

import LayoutWrapper from "@/components/LayoutWrapper";
import { CookieBanner } from "@/components/cookie-banner";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: "ČRS MO Týn nad Vltavou",
  description: "Oficiální stránky Českého rybářského svazu, místní organizace Týn nad Vltavou",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let userProfile = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('first_name, last_name, role')
      .eq('id', user.id)
      .single();
    
    // Fallback pokud záznam v profiles ještě neexistuje
    userProfile = data || { 
      first_name: user.email?.split('@')[0] || 'Neznámý', 
      last_name: 'Uživatel', 
      role: 'member' // member jako bezpečný fallback
    };
  }

  return (
    <html lang="cs" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <LayoutWrapper userProfile={userProfile}>
          <main className="flex-grow flex flex-col">{children}</main>
        </LayoutWrapper>
        <CookieBanner />
        <ScrollToTop />
      </body>
    </html>
  );
}
