// compose - function composition for redux middleware
import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAYKl5gtEhTwAiXwaNWjM2nMkW9BIAfDII',
  authDomain: 'reactclientpanel-e35c4.firebaseapp.com',
  databaseURL: 'https://reactclientpanel-e35c4.firebaseio.com',
  projectId: 'reactclientpanel-e35c4',
  storageBucket: 'reactclientpanel-e35c4.appspot.com',
  messagingSenderId: '972162003359',
};

// Firestore Configuration
const firestoreConfig = {
  timestampsInSnapshots: true,
};

// React Redux Configuration
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Firebase Initialisation
firebase.initializeApp(firebaseConfig);

// Firestore Initialisation
firebase.firestore().settings(firestoreConfig);

// Firebase Enhancers Setup
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase),
)(createStore);

// Root Reducer Setup
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Initial Redux State
const initialState = {};

// Redux Store Setup with Firebase Enhances above and with Redux Dev Tools enhancer

/* eslint-disable no-underscore-dangle */
const store = createStoreWithFirebase(rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
/* eslint-enable */

export default store;
