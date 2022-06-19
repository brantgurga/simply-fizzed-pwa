import { getAuth } from "@firebase/auth";
import Container from "@mui/material/Container";
import { getApp } from "@firebase/app";
import TextField from "@mui/material/TextField";
import { Avatar } from "@mui/material";
import { Md5 } from "md5-typescript";

function User() {
  const user = getAuth(getApp()).currentUser;
  return (
    <Container>
      <h1>User management</h1>
      <TextField label="Display Name" defaultValue={user?.displayName} />
      <TextField label="Email" defaultValue={user?.email} />
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
