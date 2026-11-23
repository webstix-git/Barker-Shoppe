import Script from "next/script";

/** Fixed circular back-to-top control (vanilla JS so it always runs). */
export function BackToTop() {
  return (
    <Script id="back-to-top-init" strategy="afterInteractive">{`
(function () {
  if (typeof window === "undefined" || document.getElementById("back-to-top-btn")) return;

  var SHOW_AFTER = 280;
  var RED = "#8b1c25";
  var RED_HOVER = "#6e151c";
  var btn = document.createElement("button");
  btn.id = "back-to-top-btn";
  btn.type = "button";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = '<svg viewBox="0 0 64 64" width="20" height="20" fill="currentColor" aria-hidden="true"><ellipse cx="32" cy="43" rx="16" ry="13"/><ellipse cx="13" cy="25" rx="7" ry="9"/><ellipse cx="26" cy="15" rx="7" ry="10"/><ellipse cx="42" cy="16" rx="7" ry="10"/><ellipse cx="54" cy="28" rx="7" ry="9"/></svg>';

  btn.style.cssText = [
    "position:fixed",
    "bottom:1.5rem",
    "right:1.25rem",
    "z-index:90",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "width:3rem",
    "height:3rem",
    "border-radius:9999px",
    "border:none",
    "color:#fff",
    "background:" + RED,
    "box-shadow:0 10px 28px rgba(139,28,37,0.4)",
    "transition:opacity .3s ease, transform .3s ease, background-color .3s ease",
    "opacity:0",
    "transform:translateY(12px)",
    "pointer-events:none",
    "cursor:pointer"
  ].join(";");

  function setVisible(show) {
    btn.style.opacity = show ? "1" : "0";
    btn.style.transform = show ? "translateY(0)" : "translateY(12px)";
    btn.style.pointerEvents = show ? "auto" : "none";
    btn.tabIndex = show ? 0 : -1;
    btn.setAttribute("aria-hidden", show ? "false" : "true");
  }

  function sync() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    setVisible(y > SHOW_AFTER);
  }

  btn.addEventListener("click", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
  btn.addEventListener("mouseenter", function () { btn.style.backgroundColor = RED_HOVER; });
  btn.addEventListener("mouseleave", function () { btn.style.backgroundColor = RED; });
  window.addEventListener("scroll", sync, { passive: true });

  document.body.appendChild(btn);
  sync();
})();
    `}</Script>
  );
}
