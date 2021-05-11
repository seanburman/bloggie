import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './assets/styles/grids.css'
import './assets/styles/global-styles.css'
import './App.css';
import Splash from './views/Splash/Splash';
import SignIn from './firebase/Authentication';

function App() {

  return (
    <Router>
            <Routes>
                <Route path='/' element={<Splash />} />
                <Route path='/SignIn' element={<SignIn />} />
                <Route path='*' element={<Splash/>} />
            </Routes>
        </Router>
  );
}

export default App;
