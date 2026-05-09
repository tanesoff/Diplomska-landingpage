/*
 * Language switcher and small UI enhancements for the FINKI AI Assistant
 * landing page. No framework, no dependencies — vanilla DOM API.
 *
 * Strategy: every translatable element carries `data-mk` and `data-en`
 * attributes that hold the two language variants. The default rendering
 * (visible in raw HTML so the page works without JS) is Macedonian. When
 * the user toggles the language, we walk the DOM once and replace each
 * element's textContent with the corresponding attribute.
 *
 * Choice is persisted to localStorage so reloads keep the language.
 */

(function () {
  const STORAGE_KEY = "finki-landing-lang";
  const DEFAULT_LANG = "mk";

  /** Apply the chosen language to every translatable element. */
  function applyLanguage(lang) {
    if (lang !== "mk" && lang !== "en") lang = DEFAULT_LANG;

    document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-mk][data-en]").forEach((el) => {
      const value = el.getAttribute("data-" + lang);
      if (value == null) return;
      // Use innerHTML so embedded <strong>, <code>, etc. survive. Trade-off:
      // the data-* attributes must contain trustworthy markup (we author it
      // by hand, so this is fine).
      el.innerHTML = value;
    });

    // Update the toggle button states for the visual indicator + a11y.
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });
  }

  /** Persist + apply the language. */
  function setLanguage(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // Storage may be blocked (private mode); the choice still applies
      // for this page load — that's good enough.
    }
    applyLanguage(lang);
  }

  /** Pick the initial language: explicit storage > <html lang> > default. */
  function detectInitialLanguage() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "mk" || saved === "en") return saved;
    } catch (e) { /* ignore */ }
    const htmlLang = document.documentElement.getAttribute("lang");
    if (htmlLang && htmlLang.startsWith("en")) return "en";
    return DEFAULT_LANG;
  }

  // Wire up the language toggle buttons.
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  // Apply the initial language as soon as the script runs. Doing this
  // here (not on DOMContentLoaded) keeps the visual flicker minimal —
  // <body> has only just been parsed, so we replace strings right after
  // it appears.
  applyLanguage(detectInitialLanguage());

  // Smooth-scroll for the anchor links is handled by `html { scroll-behavior: smooth }`
  // in CSS — no JS needed there.
})();
