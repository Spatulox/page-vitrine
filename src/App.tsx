import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil';
import Sessions from './pages/Sessions';
import Legal from './pages/Legal';
import Contact from './pages/Contact';
import Booking from './pages/Booking';

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main>
        <Routes>
          <Route path={"/"} element={<Accueil />}></Route>
          <Route path={"/accueil"} element={<Accueil />}></Route>
          <Route path={"/sessions"} element={<Sessions />}></Route>
          <Route path={"/legal"} element={<Legal />}></Route>
          <Route path={"/contact"} element={<Contact />}></Route>
          <Route path={"/booking"} element={<Booking />}></Route>
        </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  )
}

export default App
