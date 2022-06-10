import React, { useState } from "react";
import { StyledFirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Button } from "@mui/material";
import firebaseui from "firebaseui";

function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const signout = () => {
        firebase.auth().signOut();
        setIsSignedIn(false);
    }
    const setUi = (ui: firebaseui.auth.AuthUI) => {
        ui.reset();
    }
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult: any) => {
                setIsSignedIn(true);
                return false;
            }
        },
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: 'tos',
        privacyPolicyUrl: 'privacy'
    };
    if (!isSignedIn) {
        return (
            <StyledFirebaseAuth uiCallback={ui => setUi(ui)} uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        );
    } else {
        return (
            <div>
                <p>Welcome {firebase.auth().currentUser?.displayName}</p>
                <Button onClick={() => signout()}>Logout</Button>
            </div>
        )
    }

}

export default Login;