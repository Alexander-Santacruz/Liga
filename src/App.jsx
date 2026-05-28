import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Header from './Components/Header';
import Contacto from './Pages/Contact';
import Footer from './Components/Footer';
import './index.css';

function App() {
  return (
    <>
      {/* El Navbar siempre se verá porque está fuera de Routes */}
      <Navbar /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/header" element={<Header />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
