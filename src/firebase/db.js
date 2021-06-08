import firebase from 'firebase';

const db = firebase.firestore().settings({ experimentalForceLongPolling: true });;

export default db;