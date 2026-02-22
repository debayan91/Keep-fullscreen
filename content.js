function injectBaseStyles() {
  const styleId = 'keep-fullscreen-base-styles';
  if (document.getElementById(styleId)) return;

  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    /* The active class that forces fullscreen */
    .keep-fullscreen-active {
      width: 90vw !important;
      height: 90vh !important;
      max-height: 90vh !important;
      left: 5vw !important;
      top: 5vh !important;
      position: fixed !important;
      transform: none !important;
      z-index: 2001 !important;
      display: flex !important;
      flex-direction: column !important;
    }

    .keep-fullscreen-active .IZ65Hb-TBnied {
      height: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      max-height: 100% !important;
    }

    .keep-fullscreen-active .IZ65Hb-s2gQvd {
      flex: 1 1 auto !important;
      display: flex !important;
      flex-direction: column !important;
      overflow-y: auto !important;
      height: 100% !important;
    }

    .keep-fullscreen-active .IZ65Hb-r4nke-haAclf, 
    .keep-fullscreen-active .IZ65Hb-qJTHM-haAclf {
       flex: 1 1 auto !important;
    }
  `;
  document.head.appendChild(style);
}

function hasRealText(popup) {
  // Check all contenteditable areas within the popup
  const textboxes = popup.querySelectorAll('[contenteditable="true"]');
  for (const box of textboxes) {
    if (box.textContent.trim().length > 0) {
      return true;
    }
  }
  return false;
}

function updateFullscreenState() {
  const popup = document.querySelector('.IZ65Hb-n0tgWb.IZ65Hb-QQhtn');
  if (popup) {
    if (hasRealText(popup)) {
      popup.classList.add('keep-fullscreen-active');
    } else {
      popup.classList.remove('keep-fullscreen-active');
    }
  }
}

// Initial injection
injectBaseStyles();

// Monitor for changes
const observer = new MutationObserver(() => {
  injectBaseStyles();
  updateFullscreenState();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  characterData: true // Important to catch text changes directly
});

// Real-time input listener for immediate response
document.addEventListener('input', (e) => {
  if (e.target.closest('.IZ65Hb-n0tgWb.IZ65Hb-QQhtn')) {
    updateFullscreenState();
  }
}, true);

// Fallback check
setInterval(updateFullscreenState, 1000);
