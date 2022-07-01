import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { FirebaseOptions, initializeApp } from "@firebase/app";

jest.doMock("firebaseui");
jest.doMock("react-firebaseui");

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyA_nQdMwa1kKXPjVtoSkZKlf2rxfctnRF8",
  authDomain: "tokyo-hold-352402.firebaseapp.com",
  projectId: "tokyo-hold-352402",
  storageBucket: "tokyo-hold-352402.appspot.com",
  messagingSenderId: "257128045567",
  appId: "1:257128045567:web:436ef5204f643916bd25ca",
  measurementId: "G-JM5LYE3H3J",
};
initializeApp(firebaseConfig);

test("renders logo", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );

  expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
});
