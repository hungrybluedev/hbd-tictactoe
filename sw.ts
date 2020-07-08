const files_to_cache = [
  // Fonts
  "https://hungrybluedev.github.io/hbd-tictactoe/fonts/PermanentMarker-Regular.ttf",
  // Icons and images
  "https://hungrybluedev.github.io/hbd-tictactoe/images/favicon.ico",
  "https://hungrybluedev.github.io/hbd-tictactoe/images/reset.png",
  "https://hungrybluedev.github.io/hbd-tictactoe/images/info.png",
  "https://hungrybluedev.github.io/hbd-tictactoe/images/logo.png",
  "https://hungrybluedev.github.io/hbd-tictactoe/images/pvp.png",
  "https://hungrybluedev.github.io/hbd-tictactoe/images/pvc.png",
  // JS files
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/modules/constants.js",
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/modules/logic.js",
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/modules/pure_functions.js",
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/modules/types.js",
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/modules/ui.js",
  "https://hungrybluedev.github.io/hbd-tictactoe/scripts/main.js",
  // Stylesheets
  "https://hungrybluedev.github.io/hbd-tictactoe/styles/fonts.css",
  "https://hungrybluedev.github.io/hbd-tictactoe/styles/style.css",
  // HTML
  "https://hungrybluedev.github.io/hbd-tictactoe/index.html",
  "https://hungrybluedev.github.io/hbd-tictactoe/",
  // PWA stuff
  "https://hungrybluedev.github.io/hbd-tictactoe/tictactoe.manifest",
];

const cache_name = "HBDTicTacToe-v1.0.5";

self.addEventListener("install", (event: Event) => {
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(files_to_cache);
      })
      .catch((_) => {})
  );
});

self.addEventListener("activate", (event: Event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      for (const name of names) {
        if (name !== cache_name) {
          caches.delete(name);
        }
      }
    })
  );
});

self.addEventListener("fetch", (event: Event) => {
  event.respondWith(
    caches.match(event.request).then((cached_response) => {
      return cached_response || fetch(event.request);
    })
  );
});
