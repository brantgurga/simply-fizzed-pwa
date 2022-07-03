import { FirebaseOptions, initializeApp } from "@firebase/app";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import User from "./User";

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

test("displays title", () => {
  render(
    <MemoryRouter>
      <User />
    </MemoryRouter>
  );

  expect(
    screen.getByRole("heading", { name: /User management/i })
  ).toBeInTheDocument();
});
