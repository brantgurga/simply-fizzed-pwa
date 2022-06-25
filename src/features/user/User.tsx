import { EmailAuthProvider, getAuth } from "@firebase/auth";
import Container from "@mui/material/Container";
import { getApp } from "@firebase/app";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { Md5 } from "md5-typescript";
import {
  reauthenticateWithCredential,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

function User() {
  const [user, setUser] = useState(getAuth(getApp()).currentUser);
  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [displayNameUpdated, setDisplayNameUpdated] = useState(false);
  const originalEmail = user?.email || "";
  const changeEmail = (email: string) => {
    if (user !== null) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(originalEmail, originalPassword)
      ).then(() => {
        updateEmail(user, email).then(() => {
          setEmailUpdated(true);
          setUser(getAuth(getApp()).currentUser);
        });
      });
    }
  };
  const [chosenTab, setChosenTab] = useState("0");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const changePassword = () => {
    if (user != null) {
      reauthenticateWithCredential(
        user,
        EmailAuthProvider.credential(originalEmail, originalPassword)
      ).then(() => {
        updatePassword(user, password).then(() => {
          setPassword("");
          setPasswordChanged(true);
        });
      });
    }
  };
  const updateDisplayName = (newDisplayName: string) => {
    if (user != null) {
      updateProfile(user, { displayName: newDisplayName }).then(() => {
        setDisplayNameUpdated(true);
        setUser(getAuth(getApp()).currentUser);
      });
    }
  };
  return (
    <Container>
      <h1>User management</h1>
      <TabContext value={chosenTab}>
        <TabList
          onChange={(event, newValue) => {
            setChosenTab(newValue);
          }}
        >
          <Tab label="Password" value="0" />
          <Tab label="E-mail" value="1" />
          <Tab label="Display Name &amp; Avatar" value="2" />
        </TabList>
        <TabPanel value="0">
          {passwordChanged && (
            <Alert severity="success">Password Changed!</Alert>
          )}
          <TextField
            label="Original Password"
            required
            type="password"
            onBlur={(event) => {
              setOriginalPassword(event.target.value);
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
          <Button
            onClick={() => {
              changePassword();
            }}
          >
            Change Password
          </Button>
        </TabPanel>
        <TabPanel value="1">
          {emailUpdated && <Alert severity="success">E-mail updated!</Alert>}
          <TextField
            label="Original Password"
            required
            type="password"
            onBlur={(event) => {
              setOriginalPassword(event.target.value);
            }}
          />
          <TextField
            label="Email"
            defaultValue={originalEmail}
            type="email"
            onBlur={(event) => {
              changeEmail(event.target.value);
            }}
          />
        </TabPanel>
        <TabPanel value="2">
          <p>
            Your avatar comes from <a href="https://gravatar.com/">Gravatar</a>.
            Update it as desired there.
          </p>
          {displayNameUpdated && (
            <Alert severity="success">Display Name Updated!</Alert>
          )}
          <TextField
            label="Display Name"
            defaultValue={user?.displayName}
            onBlur={(event) => {
              updateDisplayName(event.target.value);
            }}
          />
          <Avatar
            src={
              user?.photoURL || user?.email
                ? `https://www.gravatar.com/avatar/${Md5.init(user?.email)}`
                : ""
            }
          />
        </TabPanel>
      </TabContext>
    </Container>
  );
}

export default User;
