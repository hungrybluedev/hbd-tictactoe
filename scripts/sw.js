const ASSETS = [
  "../fonts/PermanentMarker-Regular.ttf",
  "../images/reset.png",
  "../images/info.png",
  "../images/logo.png",
  "../images/pvp.png",
  "../images/pvc.png",
  "../scripts/main.js",
  "../styles/fonts.css",
  "../styles/style.css",
  "../index.html",
];

let cache_name = "HBDTicTacToe-v1";

self.addEventListener("install", (event) => {
  console.log("Installing...");
  event.waitUntil(
    caches
      .open(cache_name)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
      .catch((err) => {
        console.log(err);
      })
  );
});

self.addEventListener("fetch", (event) => {
  console.log(event.request);

  event.respondWith(
    caches.match(event.request).then((cached_response) => {
      return cached_response || fetch(event.request);
    })
  );
});
