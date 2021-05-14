import './grids.css'
import './Dashboard.css'
import firebase from '../../firebase/index'
import SignIn from '../../firebase/Authentication'
import { logOut } from '../../redux/user/userHelpers'
import { useState } from 'react'
import { getPosts } from '../../redux/blog/blogHelpers'

export default function Dashboard() {
    const [openNav, setOpenNav] = useState(false)
    const navState = openNav ? "open" : "closed"
    const rotateToggleButton = openNav ? " rotate180 " : "rotate0 "

    const user = firebase.auth().currentUser

    if(user) {
    return (
        <div className="grid-container-dashboard slide-in">
        <div 
            className={
                "grid-container-nav dashboard-shadow nav-drawer-open nav-drawer-" + navState
            } 
            tabIndex={-1}>
        <div className="dashboard-logo-toggle-wrapper" onClick={() => setOpenNav(!openNav)}>
        <img src="/img/logo-white.png" alt="Bloggie" className="dashboard-logo"/>
         <i className={"fas fa-arrow-circle-down nav-toggle-arrow " + rotateToggleButton} />
        </div>
         
         <div className={"dashboard-nav-button-wrapper"}>
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
        <div className="grid-container-dashboard-main dashboard-shadow">
            <div className="top-wrapper">
            <button className="user-info shadow">
            {
                user.displayName
            }
            </button>
            </div>
           <div><button onClick={() => getPosts()}>Get Posts</button></div>

        </div>
        </div>
    )    
    } else {
       return(<SignIn />) 
    }
    
    
}