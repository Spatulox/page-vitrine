import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil/Accueil';
import Sessions from './pages/Sessions/Sessions';
import Legal from './pages/Legal/Legal';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';

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
