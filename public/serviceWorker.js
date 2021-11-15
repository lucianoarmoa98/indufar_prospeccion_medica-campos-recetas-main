/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
const applicationServerPublicKey = 'BOhwzm_gcJiEDHZ0o_L1wQvZdKXVtL8sTJuI9rUTjoK51g5uLbg28i6a7G-86PpiYc-vobEXeQld0lMO59wvg0A';
const firebaseConfig = {
  apiKey: 'AIzaSyALYXL2YL1knzHrgCutAPpzCNtSpV8h_84',
  authDomain: 'indufar-prospeccion-medi-af3dc.firebaseapp.com',
  databaseURL: 'https://indufar-prospeccion-medi-af3dc.firebaseio.com',
  projectId: 'indufar-prospeccion-medi-af3dc',
  storageBucket: 'indufar-prospeccion-medi-af3dc.appspot.com',
  messagingSenderId: '204289376666',
  appId: '1:204289376666:web:2f235db969856f231c7a23',
  measurementId: 'G-FD0NZ405JL'
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  applicationServerPublicKey
);

messaging.setBackgroundMessageHandler(function(payload) {
  const title = 'Title';
  const options = {
    body: payload.data.status
  };
  return self.swRegistration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow(`${event.notification.data.redirect}`));
});
