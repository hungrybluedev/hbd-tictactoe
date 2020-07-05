const ASSETS = [
  "./fonts/PermanentMarker-Regular.ttf",
  "./images/reset.png",
  "./images/info.png",
  "./images/logo.png",
  "./images/pvp.png",
  "./images/pvc.png",
  "./scripts/main.js",
  "./styles/fonts.css",
  "./styles/style.css",
  "./index.html",
];

let cache_name = "HBDTicTacToe";

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
  console.log(event.request.url);

  event.respondWith(
    fetch(event.request).catch((err) =>
      caches.match(event.request).then((response) => response)
    )
  );
});
