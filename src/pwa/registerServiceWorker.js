/**
 * registerServiceWorker.js
 *
 * Registers the service worker (public/service-worker.js) in production.
 * Runs silently in development (where Vite's HMR would conflict anyway).
 */

export function registerServiceWorker() {
  // Only register in production builds served over HTTPS (or localhost)
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      const reg = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
      });

      // Check for updates on each page load
      reg.addEventListener('updatefound', () => {
        const worker = reg.installing;
        if (!worker) return;

        worker.addEventListener('statechange', () => {
          if (worker.state === 'installed' && navigator.serviceWorker.controller) {
            // A new version is available — you could show a toast here
            console.log('[StavBoard SW] New version available. Refresh to update.');
          }
        });
      });

      console.log('[StavBoard SW] Registered:', reg.scope);
    } catch (err) {
      console.warn('[StavBoard SW] Registration failed:', err);
    }
  });
}
