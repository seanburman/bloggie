import firebase from '../firebase/index'

export default function SignedInPage() {
    return (
        <div>
        {firebase.auth().currentUser.uid}
        <button onClick={() => firebase.auth().signOut()}>Sign out</button>
        </div>
        
    )
}