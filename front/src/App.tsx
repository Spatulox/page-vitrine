import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil/Accueil';
import Sessions from './pages/Sessions/Sessions';
import Legal from './pages/Legal/Legal';
import Contact from './pages/Contact/Contact';
import Booking from './pages/Booking/Booking';
import { Room, RoomDetails } from './pages/Escape/Rooms';
import Account from './pages/Account/Account';
import { AuthProvider } from './components/AuthContext';
import AccountDetails from './pages/Account/AccountDetails';



export enum UrlRoute {
  Base = "/",
  Accueil = "/accueil",
  Account = "/account",
  Sessions = "/sessions",
  Legal = "/legal",
  Contact = "/contact",
  Booking = "/booking",
  Rooms = "/rooms",

  Users = "/users",
};

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Header />
        <main className="container">
        <Routes>
          <Route path={UrlRoute.Base} element={<Accueil />} />
          <Route path={UrlRoute.Accueil} element={<Accueil />} />
          <Route path={UrlRoute.Account} element={<Account />} />
          <Route path={UrlRoute.Sessions} element={<Sessions />} />
          <Route path={UrlRoute.Legal} element={<Legal />} />
          <Route path={UrlRoute.Contact} element={<Contact />} />
          
          <Route path={UrlRoute.Booking} element={<Booking />} />
          <Route path={`${UrlRoute.Booking}/:id`} element={<Booking />} />
          
          <Route path={UrlRoute.Rooms} element={<Room />} />
          <Route path={`${UrlRoute.Rooms}/:id`} element={<RoomDetails />} />


          <Route path={`${UrlRoute.Users}/:id`} element={<AccountDetails />} />


        </Routes>
        </main>
        <Footer />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
