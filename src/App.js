import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './assets/styles/grids.css'
import './assets/styles/global-styles.css'
import './assets/styles/animations.css'
import './assets/fonts/fonts.css'
import './App.css';
import Splash from './views/Splash/Splash';
import SignIn from './firebase/Authentication';
import Dashboard from './views/Dashboard/Dashboard';
import React from 'react';
import Blog from './views/Blog/Blogs';

function App() {
  return (
    <React.Fragment>
    <Router>
    <Routes>
        <Route path='/SignIn' element={<SignIn />} />
        <Route path='/Dashboard/*' element={<Dashboard />} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='*' element={<Splash />} />
    </Routes>
    </Router>
    </React.Fragment>
    
    
  );
}



export default App;
