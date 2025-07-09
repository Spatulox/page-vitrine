import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil/Accueil';
import Sessions from './pages/Sessions/Sessions';
import Legal from './pages/Legal/Legal';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import { Room, RoomDetails } from './pages/Escape/Rooms';


export const UrlRoute = {
  Base: "/",
  Accueil: "/accueil",
  Sessions: "/sessions",
  Legal: "/legal",
  Contact: "/contact",
  Booking: "/booking",
  Rooms: "/rooms",
} as const;

function App() {
  return (
    <BrowserRouter>
        <Header />
        <main className="container">
        <Routes>
          <Route path={UrlRoute.Base} element={<Accueil />} />
          <Route path={UrlRoute.Accueil} element={<Accueil />} />
          <Route path={UrlRoute.Sessions} element={<Sessions />} />
          <Route path={UrlRoute.Legal} element={<Legal />} />
          <Route path={UrlRoute.Contact} element={<Contact />} />
          <Route path={UrlRoute.Booking} element={<Booking />} />
          <Route path={UrlRoute.Rooms} element={<Room />} />
          <Route path={`${UrlRoute.Rooms}/:id`} element={<RoomDetails />} />
        </Routes>
        </main>
        <Footer />
    </BrowserRouter>
  )
}

export default App
