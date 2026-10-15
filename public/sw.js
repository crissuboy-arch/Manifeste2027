// Manifest 2027 AI — service worker (cache-first para assets públicos; nunca dados privados)
const CACHE = "manifest2027-v1";
const PUBLIC_ASSETS = ["/", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PUBLIC_ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Nunca cachear API ou páginas autenticadas
  if (url.pathname.startsWith("/api/")) return;
  if (["/dashboard", "/coach", "/journal", "/library"].some((p) => url.pathname.startsWith(p))) return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
