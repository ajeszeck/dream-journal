import firebase from 'firebase';

const db = firebase.firestore();
firebase.firestore.setLogLevel("debug");

export default db;