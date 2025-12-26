// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyC5f31c0v8QFW4hk-SPJ-GKlChRDoxyFfw",
  authDomain: "na-regua-24889.firebaseapp.com",
  projectId: "na-regua-24889",
  storageBucket: "na-regua-24889.firebasestorage.app",
  messagingSenderId: "103802882146",
  appId: "1:103802882146:web:f0617d564468b9d9b0e93b",
  measurementId: "G-F751YESV4N"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192x192.png' // você pode usar um ícone personalizado
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

