import React, { useState } from "react";
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Button } from "@mui/material";
import firebaseui from "firebaseui";
import { EmailAuthProvider, getAuth } from 'firebase/auth';
import { getApp } from 'firebase/app';

function Login() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const signout = () => {
        getAuth(getApp()).signOut();
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
            EmailAuthProvider.PROVIDER_ID
        ],
        tosUrl: 'tos',
        privacyPolicyUrl: 'privacy'
    };
    if (!isSignedIn) {
        return (
            <StyledFirebaseAuth uiCallback={ui => setUi(ui)} uiConfig={uiConfig} firebaseAuth={getAuth(getApp())} />
        );
    } else {
        return (
            <div>
                <p>Welcome {getAuth(getApp()).currentUser?.displayName}</p>
                <Button onClick={() => signout()}>Logout</Button>
            </div>
        )
    }

}

export default Login;