import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';   // Home Page
import {Header, Footer} from '../src/components'
import './index.css';
import Loginpage from './pages/loginpage';


function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
