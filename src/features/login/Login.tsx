import { StyledFirebaseAuth } from "react-firebaseui";
import { Button } from "@mui/material";
import firebaseui from "firebaseui";
import { EmailAuthProvider, getAuth } from "firebase/auth";
import { getApp } from "firebase/app";

interface LoginProps {
  signedInState: {
    setIsSignedIn: (newSignedInValue: boolean) => void;
    isSignedIn: boolean;
  };
}

function Login(props: LoginProps) {
  const signout = () => {
    getAuth(getApp())
      .signOut()
      .then(() => {
        props.signedInState.setIsSignedIn(false);
      });
  };
  const setUi = (ui: firebaseui.auth.AuthUI) => {
    ui.reset();
  };
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: (_authResult: any) => {
        props.signedInState.setIsSignedIn(true);
        return false;
      },
    },
    signInOptions: [EmailAuthProvider.PROVIDER_ID],
    tosUrl: "tos",
    privacyPolicyUrl: "privacy",
  };
  if (!props.signedInState.isSignedIn) {
    return (
      <StyledFirebaseAuth
        uiCallback={(ui) => setUi(ui)}
        uiConfig={uiConfig}
        firebaseAuth={getAuth(getApp())}
      />
    );
  } else {
    return (
      <div>
        <p>Welcome {getAuth(getApp()).currentUser?.displayName}</p>
        <Button onClick={() => signout()}>Logout</Button>
      </div>
    );
  }
}

export default Login;
