/**
 * Smooth-scroll to an element. Interruptible by mouse wheel / touch.
 * Falls back to instant scroll if anything goes wrong.
 */
export function scrollToElement(elementId, offset = 96) {
  const el = document.getElementById(elementId);
  if (!el) return;

  const target = el.getBoundingClientRect().top + window.scrollY - offset;
  const start = window.scrollY;
  const distance = target - start;
  if (Math.abs(distance) < 4) return;

  const duration = 500; // ms
  let startTime = null;
  let cancelled = false;

  const onWheel = () => {
    cancelled = true;
    window.removeEventListener('wheel', onWheel, { passive: true });
    window.removeEventListener('touchstart', onWheel, { passive: true });
  };

  window.addEventListener('wheel', onWheel, { passive: true, once: false });
  window.addEventListener('touchstart', onWheel, { passive: true, once: false });

  const animate = (currentTime) => {
    if (cancelled) return;
    if (!startTime) startTime = currentTime;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3);
    window.scrollTo(0, start + distance * eased);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onWheel);
    }
  };

  requestAnimationFrame(animate);
}
