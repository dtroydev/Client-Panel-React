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
  userProfile: 'users', // store user profiles
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Firebase Initialisation
firebase.initializeApp(firebaseConfig);

// Firestore Initialisation
firebase.firestore().settings(firestoreConfig);

// Firebase Auth Initialisation

if (process.env.NODE_ENV === 'test') {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
} else {
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

// Firebase Auth Listener (TESTING)
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('Auth Listener: User has signed in with UID:', user.uid);
  } else {
    console.log('Auth Listener: No user is signed in');
  }
});

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

// Redux Store Setup with Firebase Enhancers above
// and with Redux Dev Tools enhancer if not in production

const params = [
  rootReducer,
  initialState,
];

console.log('Environment:', process.env.NODE_ENV);

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable no-underscore-dangle */
  params.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  /* eslint-enable */
}

export default createStoreWithFirebase(...params);
