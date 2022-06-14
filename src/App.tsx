import React from 'react';
import logo from './logo.svg';
import './App.css';
import {FirebaseOptions, initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import Login from './features/login/Login';

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA_nQdMwa1kKXPjVtoSkZKlf2rxfctnRF8",
  authDomain: "tokyo-hold-352402.firebaseapp.com",
  projectId: "tokyo-hold-352402",
  storageBucket: "tokyo-hold-352402.appspot.com",
  messagingSenderId: "257128045567",
  appId: "1:257128045567:web:436ef5204f643916bd25ca",
  measurementId: "G-JM5LYE3H3J"
};
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login />
      </header>
    </div>
  );
}

export default App;
