/*jshint esversion: 6 */

//Service worker scripts
/*code assisted by "Intro To Service Worker & Caching"
https://www.youtube.com/watch?v=ksXwaWHCW6k
*/

const cacheVersion = 'v2';
const toCache = [
    '/',
    'index.html',
    'restaurant.html',
    'restaurant_info.js',
    'main.js',
    'dbhelper.js',
    'restaurants.json',
    'styles.css',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

self.addEventListener('install', e => {
    console.log('install SW');
});

self.addEventListener('activate', e => {
    console.log('activate SW');
    //loops through cache and deletes all but the current
    e.waitUntil(
        caches.keys().then(cacheVersion => {
            return Promise.all(
                cacheVersion.map(cache => {
                    if (cache !== cacheVersion) {
                        console.log('clearing old cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', event =>
    event.respondWith(
        fetch(event.request).then(respons => {
            const resClone = respons.clone();
            caches.open(cacheVersion)
                .then(cache => {
                    cache.put(event.request, resClone);
                });
            return respons;
        })
            .catch(err => caches.match(event.request)).then(respons => respons)
    ));

