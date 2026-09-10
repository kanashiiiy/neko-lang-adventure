import { useEffect, useState } from "react";
import { UI_LANG_FADE_EVENT } from "@/lib/i18n";

/**
 * Piscada rápida e suave enquanto todos os textos trocam de idioma.
 * Não desmonta a página nem interfere na navegação.
 */
export function UiLangTransition() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ active?: boolean }>).detail;
      setActive(Boolean(detail?.active));
    };
    window.addEventListener(UI_LANG_FADE_EVENT, handler);
    return () => window.removeEventListener(UI_LANG_FADE_EVENT, handler);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] bg-background transition-opacity duration-150 ease-out"
      style={{ opacity: active ? 1 : 0, visibility: active ? "visible" : "hidden" }}
    />
  );
}
