const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/styles.css",
  "/index.js",
  "/db.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/manifest.webmanifest",
];

const PRECACHE = "precache-v1";
const RUNTIME = "runtime";

// install
self.addEventListener("install", function (evt) {
  evt.waitUntil(
    caches.open(PRECACHE).then((cache) => {
      console.log("Your files were pre-cached successfully!");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// once we retrieve all the keys, create them all as promises and then map through them. its cleaning out the outdated files once we activate the newest version.
self.addEventListener("activate", function (evt) {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== PRECACHE && key !== RUNTIME) {
            console.log("Removing old cache data", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  //telling the new service worker to take over
  self.clients.claim();
});

// fetch (Cache api responses from an api call in the browser, so user still has access to that data in the browser if they lose internet)
self.addEventListener("fetch", function (evt) {
  // cache successful requests to the API
  if (evt.request.url.includes("/api/")) {
    evt.respondWith(
      //open cache and store that fetch response in the cache if it came through ok
      caches
        .open(RUNTIME)
        .then((cache) => {
          return fetch(evt.request)
            .then((response) => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone()); //clone so the original response is saved and stored in db and the cloned response is stored in the cache (keep data immutable)
              }

              return response;
            })
            .catch((err) => {
              // Network request failed, try to get it from the cache.
              return cache.match(evt.request);
            });
        })
        .catch((err) => console.log(err))
    );

    return;
  }
  //if we go offline, give them the static content we've downloaded above and then fetch the api calls afterwards. always display the static content first when offline, then the api content after
  evt.respondWith(
    caches.match(evt.request).then(function (response) {
      return response || fetch(evt.request);
    })
  );
});
