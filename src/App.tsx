import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil/Accueil';
import Sessions from './pages/Sessions/Sessions';
import Legal from './pages/Legal/Legal';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import CryptePage from "./pages/Escape/Crypte";
import ManoirPage from "./pages/Escape/Manoir";
import AsilePage from "./pages/Escape/Asile";
import MinePage from "./pages/Escape/Mine";
import LaboPage from "./pages/Escape/Labo";
import TrainPage from "./pages/Escape/Train";

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className="container">
        <Routes>
          <Route path={"/"} element={<Accueil />}></Route>
          <Route path={"/accueil"} element={<Accueil />}></Route>
          <Route path={"/sessions"} element={<Sessions />}></Route>
          <Route path={"/legal"} element={<Legal />}></Route>
          <Route path={"/contact"} element={<Contact />}></Route>
          <Route path={"/booking"} element={<Booking />}></Route>
            <Route path="/crypte" element={<CryptePage />} />
            <Route path="/manoir" element={<ManoirPage />} />
            <Route path="/asile" element={<AsilePage />} />
            <Route path="/mine" element={<MinePage />} />
            <Route path="/labo" element={<LaboPage />} />
            <Route path="/train" element={<TrainPage />} />
        </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  )
}

export default App
