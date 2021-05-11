import firebase from './index'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useEffect, useState } from 'react';
import SignedInPage from '../views/SignedIn';
import './Authentication.css'

const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
      };

export default function SignIn() {
    const [ isSignedIn, setIsSignedIn ] = useState(false);

    // Listen to the Firebase Auth state and set the local state.
    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
          setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }, []);

      useEffect(() => {
          if(isSignedIn) {
              console.log(firebase.auth().currentUser.uid)
          }
      },[isSignedIn])

    if (!isSignedIn) {
        return (
                <div className="signin-screen bg-gradient">
                <div className="signin-logo-wrapper">
                  <a href="/home">
                  <img src="/img/logo.png" className="logo" alt="Bloggie logo"/>
                  </a>
                  
                </div>
                
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                </div> 
            )
    }
    return (
        <SignedInPage />
      )

}

// 