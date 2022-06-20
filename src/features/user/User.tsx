import { EmailAuthProvider, getAuth } from "@firebase/auth";
import Container from "@mui/material/Container";
import { getApp } from "@firebase/app";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import { Md5 } from "md5-typescript";
import { reauthenticateWithCredential, updateEmail } from "firebase/auth";
import { useState } from "react";

function User() {
  const [user, setUser] = useState(getAuth(getApp()).currentUser);
  const [password, setPassword] = useState("");
  const originalEmail = user?.email || "";
  const changeEmail = (email: string) => {
    if (user !== null) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(originalEmail, password)
      ).then(() => {
        updateEmail(user, email).then(() => {
          setUser(getAuth(getApp()).currentUser);
        });
      });
    }
  };
  return (
    <Container>
      <h1>User management</h1>
      <TextField label="Display Name" defaultValue={user?.displayName} />
      <TextField
        label="Email"
        defaultValue={originalEmail}
        type="email"
        onBlur={(event) => {
          changeEmail(event.target.value);
        }}
      />
      <TextField
        onBlur={(event) => {
          setPassword(event.target.value);
        }}
        id="password"
        label="Password"
        type="password"
        required
      />
      <Avatar
        src={
          user?.photoURL || user?.email
            ? `https://www.gravatar.com/avatar/${Md5.init(user?.email)}`
            : ""
        }
      />
    </Container>
  );
}

export default User;
