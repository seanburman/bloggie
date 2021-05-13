import './Splash.css'
import '../../assets/styles/global-styles.css'

export default function Splash() {

    return (
        <div className="container-app">
      <div className="grid-container-main shadow">
      <div className="container-create-account">
        <img src="/img/logo.png" alt="Bloggie Logo" className="logo"/>
        <h1>Create Account</h1>
        <p>Start an account for free and have your own embeddable blog in minutes!</p>

        <a href="/signIn">
        <button className="login-signup shadow hover-bounce">
        Login or Signup
        </button>
        </a>

      </div>
      <div className="grid-container-content bg-gradient">

        <div className="content-items hover-bounce shadow">
        <i className="fas fa-lightbulb" />
        <p>Get Inspiration</p>
        </div>
        
        <div className="content-items hover-bounce shadow">
        <i className="fas fa-image" />
        <p>Upload Images</p>
        </div>
        
        <div className="content-items hover-bounce shadow">
        <i className="fas fa-pencil-alt" />
        <p>Write Posts</p>
        </div>
        
        <div className="content-items hover-bounce shadow">
        <i className="fas fa-cog" />
        <p>Customize Themes</p>
        </div>
        
        
        
        <div className="content-items hover-bounce shadow">
        <i className="fas fa-code" />
        <p>Embed Blog</p>
        </div>
        
        <div className="content-items hover-bounce shadow">
        <i className="fas fa-share" />
        <p>Share Content</p>
        </div>
        
        
      </div>

      </div>
    </div>
    )
}