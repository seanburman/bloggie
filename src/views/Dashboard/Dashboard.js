import './grids.css'
import './Dashboard.css'
import firebase from '../../firebase/index'
import SignIn from '../../firebase/Authentication'
import { logOut } from '../../redux/user/userHelpers'

export default function Dashboard() {

    const user = firebase.auth().currentUser

    if(user) {
    return (
        
        <div className="grid-container-dashboard">
        <div className="grid-container-nav dashboard-shadow" tabIndex={-1}>
         <img src="/img/logo-white.png" alt="Bloggie" className="dashboard-logo"/>
         <div className="dashboard-nav-button-wrapper">
            <button className="dashboard-nav-button">
            <i className="fas fa-pencil-alt" />
            Blog
            </button>

            <button className="dashboard-nav-button">
            <i className="fas fa-image" />
            Images
            </button>

            <button className="dashboard-nav-button">
            <i className="fas fa-cog" />
            Settings
            </button>

            <button className="dashboard-nav-button">
            <i className="fas fa-code" />
            Embed
            </button>

            <button 
            className="dashboard-nav-button"
            onClick={() => logOut()}
            >
            <i className="fas fa-sign-out-alt" />
            Sign Out
            </button>
         </div>
         <div className="social-media-wrapper">
         <i className="fab fa-github" />
         </div>
        </div>
        <div className="container-main dashboard-shadow">
            <div className="top-wrapper">
            <button className="user-info shadow">
            {
                user.displayName
            }
            </button>
            </div>
        </div>
        </div>
    )    
    } else {
       return(<SignIn />) 
    }
    
    
}