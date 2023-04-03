import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDNGTf018AJVC7rmYL9bHow34mSKCBY9_I",
    authDomain: "drive-clone-4378b.firebaseapp.com",
    projectId: "drive-clone-4378b",
    storageBucket: "drive-clone-4378b.appspot.com",
    messagingSenderId: "620096296048",
    appId: "1:620096296048:web:dda267608e6694e1f210b5",
    measurementId: "G-MT7FENFPX3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, storage, auth, provider }