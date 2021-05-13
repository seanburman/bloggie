import firebase from './index'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useEffect, useState } from 'react';
import './Authentication.css'
import Dashboard from '../views/Dashboard/Dashboard';
import { storeUser } from '../redux/user/userHelpers';

const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /Dashboard after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        // signInSuccessUrl: '/Dashboard',
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
          storeUser(user)
        });
        return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
      }, []);


    if (!isSignedIn) {
        return (
                <div className="signin-screen bg-gradient">
                <div className="signin-logo-wrapper slide-in">
                  <a href="/">
                  <img src="/img/logo-white.png" className="logo" alt="Bloggie logo"/>
                  </a>
                  
                </div>
                
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} 
                    className="slide-in"
                    />
                </div> 
            )
    }
    return (<Dashboard />)

}