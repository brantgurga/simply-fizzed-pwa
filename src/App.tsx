import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Login from './features/login/Login';

const firebaseConfig = {
  apiKey: "AIzaSyA_nQdMwa1kKXPjVtoSkZKlf2rxfctnRF8",
  authDomain: "tokyo-hold-352402.firebaseapp.com",
  projectId: "tokyo-hold-352402",
  storageBucket: "tokyo-hold-352402.appspot.com",
  messagingSenderId: "257128045567",
  appId: "1:257128045567:web:436ef5204f643916bd25ca",
  measurementId: "G-JM5LYE3H3J"
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Login />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
