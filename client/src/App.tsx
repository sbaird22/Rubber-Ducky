import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../src/pages/home';   // Home Page
import {Header, Footer} from '../src/components'
import './index.css';
import { Bug, Contact, Loginpage, Registerpage, Testimonials, UserDashboard, SubmitBug} from './pages';


function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/bug" element={<Bug />} />
          <Route path="/submitbug" element={<SubmitBug />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
