import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAvWJUh4-bmEF5tzebtVh06PC1ybBwFqnU",
    authDomain: "curso-d2978.firebaseapp.com",
    projectId: "curso-d2978",
    storageBucket: "curso-d2978.appspot.com",
    messagingSenderId: "751813523858",
    appId: "1:751813523858:web:abb9572a075096d304e94b",
    measurementId: "G-CXQYRBHF4P"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const db  = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export { db, auth };