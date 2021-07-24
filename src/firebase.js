import firebase from 'firebase/app';
import 'firebase/database';

// Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCpSS1B3qCgIiDkSCDk11N3rLfbux_HrDM",
  authDomain: "ttrpg-notice-board.firebaseapp.com",
  projectId: "ttrpg-notice-board",
  storageBucket: "ttrpg-notice-board.appspot.com",
  messagingSenderId: "555366152556",
  appId: "1:555366152556:web:8f97a19be2e64aad051b49"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;