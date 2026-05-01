"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Zkontrolujeme, zda už uživatel vyjádřil souhlas/nesouhlas
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Malé zpoždění pro lepší UX (aby banner nevyskočil okamžitě)
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setIsVisible(false);
    // Zde by se spustily analytické a marketingové skripty
  };

  const acceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setIsVisible(false);
    // Analytika zůstane vypnutá
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
        >
          <div className="mx-auto max-w-4xl rounded-2xl bg-slate-900 p-6 text-slate-100 shadow-2xl ring-1 ring-white/10 md:flex md:items-center md:justify-between md:gap-6">
            <div className="mb-4 md:mb-0">
              <h3 className="mb-2 text-lg font-semibold text-white">
                Vážíme si vašeho soukromí
              </h3>
              <p className="text-sm text-slate-300">
                Tento web používá cookies k zajištění základní funkčnosti (nezbytné) a k analýze návštěvnosti (analytické). Kliknutím na „Přijmout vše“ souhlasíte s používáním všech cookies. Můžete také přijmout pouze nezbytné cookies. Přečtěte si naše{" "}
                <Link
                  href="/cookies"
                  className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Zásady používání cookies
                </Link>{" "}
                a{" "}
                <Link
                  href="/gdpr"
                  className="font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                >
                  Zásady ochrany osobních údajů (GDPR)
                </Link>.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <button
                onClick={acceptNecessary}
                className="rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-200 transition-colors hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Pouze nezbytné
              </button>
              <button
                onClick={acceptAll}
                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                Přijmout vše
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
