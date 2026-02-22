function applyFullscreenStyles() {
  const target = document.querySelector('.IZ65Hb-n0tgWb.di8rgd-r4nke.IZ65Hb-QQhtn.oT9UPb');
  if (target) {
    target.style.setProperty('width', '90vw', 'important');
    target.style.setProperty('max-height', '90vh', 'important');
    target.style.setProperty('left', '5vw', 'important');
    target.style.setProperty('top', '5vh', 'important');
    target.style.setProperty('position', 'fixed', 'important');
    target.style.setProperty('transform', 'none', 'important');
  }
}

const observer = new MutationObserver(() => {
  // Try to find and apply styles to the target element
  // Since we use subtree: true, it checks whenever any element is added/modified
  applyFullscreenStyles();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// Run immediately in case it's already in the DOM
applyFullscreenStyles();
