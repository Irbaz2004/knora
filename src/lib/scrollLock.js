const locks = new Set();
export function lockPageScroll() {
  const token = Symbol("scroll-lock");
  locks.add(token);
  document.documentElement.classList.add("page-scroll-locked");
  window.dispatchEvent(new Event("knora:scroll-lock"));
  return () => {
    if (!locks.delete(token)) return;
    if (locks.size === 0)
      document.documentElement.classList.remove("page-scroll-locked");
    window.dispatchEvent(new Event("knora:scroll-lock"));
  };
}
