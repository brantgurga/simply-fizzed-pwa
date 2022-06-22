import { StrictMode } from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { render } from "react-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";

const container = document.getElementById("root")!;
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA_nQdMwa1kKXPjVtoSkZKlf2rxfctnRF8",
  authDomain: "tokyo-hold-352402.firebaseapp.com",
  projectId: "tokyo-hold-352402",
  storageBucket: "tokyo-hold-352402.appspot.com",
  messagingSenderId: "257128045567",
  appId: "1:257128045567:web:436ef5204f643916bd25ca",
  measurementId: "G-JM5LYE3H3J",
};
const firebaseApp = initializeApp(firebaseConfig);
getAnalytics(firebaseApp);
declare global {
  interface Window {
    FIREBASE_APPCHECK_DEBUG_TOKEN: string;
  }
}
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  // eslint-disable-next-line no-restricted-globals
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env
    .REACT_APP_RECAPTCHA_KEY as string;
}
initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(
    process.env.REACT_APP_RECAPTCHA_KEY as string
  ),
  isTokenAutoRefreshEnabled: true,
});
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence).then(() => {
  render(
    <StrictMode>
      <CssBaseline enableColorScheme />
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>,
    container
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
