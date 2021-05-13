import { loadUser } from './userSlice'
import store from '../store'
import firebase from '../../firebase/index'

export function storeUser(user) {
    store.dispatch(loadUser({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
    }))
}

export const logOut = () => {
    firebase.auth().signOut()    
}