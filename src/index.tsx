import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { render } from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TermsOfService from './features/terms-of-service/TermsOfService';
import PrivacyPolicy from './features/privacy-policy/PrivacyPolicy';
import User from './features/user/User';
import Broken from './features/broken/Broken';

const container = document.getElementById('root')!;
render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="tos" element={<TermsOfService />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<Broken />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
, container);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
