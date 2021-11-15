/* eslint-disable */
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

const db = firebase.firestore();

const messaging = firebase.messaging();
messaging.usePublicVapidKey(applicationServerPublicKey);

let serviceWorker = null;

function enviarTokenAlServer(currentToken) {
  const username = localStorage.getItem('username');
  localStorage.setItem('fcmToken', currentToken);
  db.collection('users').doc(username).set({
    tokens: firebase.firestore.FieldValue.arrayUnion(currentToken)
  }, { merge: true }).catch(error => {
    console.error('No se pudo guardar el token en la base de datos. ', error);
  });
}

function obtenerToken() {
  messaging.getToken()
    .then(currentToken => {
      if (currentToken) {
        enviarTokenAlServer(currentToken);
      } else {
        console.error('No existe instancia de token disponible.');
      }
    })
    .catch(error => {
      console.error('An error occurred while retrieving token. ', error);
    });
}

function inicializarFCM() {
  Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
      messaging.onTokenRefresh(() => {
        obtenerToken();
      });
      obtenerToken();
      messaging.onMessage(payload => {
        serviceWorker.showNotification(payload.notification.title, {
          ...payload.notification,
          data: payload.data
        });
      });
    } else {
      console.log('Sin permiso para notificar.');
    }
  });
}

function serviceWorkerEsSoportado() {
  return 'serviceWorker' in navigator && 'PushManager' in window;
}

if (serviceWorkerEsSoportado()) {
  navigator.serviceWorker
    .register('serviceWorker.js')
    .then(serviceWorkerARegistrar => {
      serviceWorker = serviceWorkerARegistrar;
      messaging.useServiceWorker(serviceWorker);
      if (localStorage.getItem('username')) {
        inicializarFCM();
      }
    })
    .catch(error => {
      console.error('Service Worker Error', error);
    });
} else {
  console.warn('Push messging no es soportado.');
}
