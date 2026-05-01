"use client";

import { useState } from "react";
import { submitQuestion } from "./actions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import Script from "next/script";

export default function QuestionForm() {
  const [isPending, setIsPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(formData: FormData) {
    setIsPending(true);
    setError(null);
    setSuccess(false);

    const result = await submitQuestion(formData);

    if (result.error) {
      setError(result.error);
    } else if (result.success) {
      setSuccess(true);
      // Formulář se po úspěšném odeslání vymaže (přesměrováno logikou níže)
    }
    
    setIsPending(false);
  }

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Dotaz byl úspěšně odeslán</h3>
        <p className="text-green-800 mb-6">
          Děkujeme za váš dotaz. Byl předán výboru a čeká na vyřízení. Jakmile na něj odpovíme, objeví se zde na stránce.
        </p>
        <button 
          onClick={() => setSuccess(false)}
          className="text-green-700 font-bold hover:underline"
        >
          Odeslat další dotaz
        </button>
      </div>
    );
  }

  return (
    <>
      <Script 
        src="https://challenges.cloudflare.com/turnstile/v0/api.js" 
        strategy="afterInteractive"
      />
      <form action={onSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Zeptejte se výboru</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="author_name" className="block text-sm font-semibold text-gray-700 mb-2">
            Vaše jméno *
          </label>
          <input
            type="text"
            id="author_name"
            name="author_name"
            required
            placeholder="Jan Novák"
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
          />
        </div>
        <div>
          <label htmlFor="author_email" className="block text-sm font-semibold text-gray-700 mb-2">
            E-mail (nepovinné)
          </label>
          <input
            type="email"
            id="author_email"
            name="author_email"
            placeholder="jan.novak@seznam.cz"
            className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
          Text dotazu *
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={4}
          placeholder="Berou u Kořenska ty ryby, nebo tam mám jet jenom krmit komáry?"
          className="w-full rounded-lg border-2 border-gray-300 bg-white text-gray-900 px-4 py-2.5 focus:border-green-500 focus:ring-green-500"
        />
      </div>

      {/* Ochrana proti robotům (Cloudflare Turnstile) */}
      <div className="mb-6 flex justify-center md:justify-start">
        <div 
          className="cf-turnstile" 
          data-sitekey="0x4AAAAAADEc1_rIvaw3wP-L"
          data-theme="light"
        ></div>
      </div>

      {/* Ochrana proti robotům (Honeypot) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="bot_field">Nechytat - nechte prázdné</label>
        <input type="text" id="bot_field" name="bot_field" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 hover:bg-green-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? "Odesílám..." : "Odeslat dotaz"} 
          {!isPending && <Send className="w-4 h-4" />}
        </button>
      </div>
    </form>
    </>
  );
}
