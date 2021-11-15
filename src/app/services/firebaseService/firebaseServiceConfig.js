const prodConfig = {
  apiKey: 'AIzaSyALYXL2YL1knzHrgCutAPpzCNtSpV8h_84',
  authDomain: 'indufar-prospeccion-medi-af3dc.firebaseapp.com',
  databaseURL: 'https://indufar-prospeccion-medi-af3dc.firebaseio.com',
  projectId: "indufar-prospeccion-medi-af3dc",
  storageBucket: "indufar-prospeccion-medi-af3dc.appspot.com",
  messagingSenderId: "204289376666",
};

const devConfig = {
  apiKey: 'AIzaSyALYXL2YL1knzHrgCutAPpzCNtSpV8h_84',
  authDomain: 'indufar-prospeccion-medi-af3dc.firebaseapp.com',
  databaseURL: 'https://indufar-prospeccion-medi-af3dc.firebaseio.com',
  projectId: "indufar-prospeccion-medi-af3dc",
  storageBucket: "indufar-prospeccion-medi-af3dc.appspot.com",
  messagingSenderId: "204289376666",
};

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;

export default config;
