
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado.');
});

self.addEventListener('activate', (event) => {
    console.log('Service Worker ativado.');
});

self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {};
    const title = data.title || 'Nova notificação';
    const options = {
        body: data.body || 'Você tem uma nova mensagem',
        icon: '/icons/web-app-manifest-192x192.png',
        badge: '/icons/favicon-96x96.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
});
