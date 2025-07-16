import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Accueil from './pages/Accueil/Accueil';
import Sessions from './pages/Sessions/Sessions';
import Legal from './pages/Legal/Legal';
import Contact from './pages/Contact/Contact';
import { Room, RoomDetails } from './pages/Rooms/Rooms';
import Account from './pages/Account/Account';
import { AuthProvider } from './components/AuthContext';
import UserDetailsAdmin from './pages/Users/UserDetailsAdmin';
import Users from './pages/Users/Users';
import UpdateMyAccount from './pages/Account/UpdateAccount';
import Manage from './pages/Manage/Manage';
import ManageSessions from './pages/Sessions/ManageSessions';
import { MenuManageRoom } from './pages/Rooms/ManageRooms';
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./services/ToastService.css"
import ManageContactMessages from './pages/Contact/ManageContactMessages';



export enum FrontRoute {
  Base = "/",
  Accueil = "/accueil",
  Account = "/account",
  UpdateAccount = `${FrontRoute.Account}/update`,
  Sessions = "/sessions",
  Legal = "/legal",
  Contact = "/contact",
  Booking = "/booking",
  Rooms = "/rooms",

  Manage = "/manage",
  ManageSessions = `${FrontRoute.Sessions}/manage`,
  ManageRooms = `${FrontRoute.Rooms}/manage`,
  ManageMessages = `${FrontRoute.Contact}/manage`,

  Users = "/users",
};

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
        <Header />
        <main className="container">
        <Routes>
          <Route path={FrontRoute.Base} element={<Accueil />} />
          <Route path={FrontRoute.Accueil} element={<Accueil />} />
          <Route path={FrontRoute.Legal} element={<Legal />} />
          <Route path={FrontRoute.Contact} element={<Contact />} />
          
          <Route path={FrontRoute.Account} element={<Account />} />
          <Route path={FrontRoute.UpdateAccount} element={<UpdateMyAccount />} />
          
          <Route path={FrontRoute.Booking} element={<Sessions />} />
          <Route path={`${FrontRoute.Booking}/:id`} element={<Sessions />} />
          
          <Route path={FrontRoute.Rooms} element={<Room />} />
          <Route path={`${FrontRoute.Rooms}/:id`} element={<RoomDetails />} />

          <Route path={`${FrontRoute.Users}`} element={<Users />} />
          <Route path={`${FrontRoute.Users}/:id`} element={<UserDetailsAdmin />} />
          <Route path={`${FrontRoute.Users}/me`} element={<Account />} />


          <Route path={`${FrontRoute.Manage}`} element={<Manage />} />
          <Route path={`${FrontRoute.ManageSessions}`} element={<ManageSessions />} />
          <Route path={`${FrontRoute.ManageRooms}`} element={<MenuManageRoom />} />
          <Route path={`${FrontRoute.ManageMessages}`} element={<ManageContactMessages />} />


        </Routes>
        <ToastContainer position="bottom-right" autoClose={4000} toastClassName="custom-toast" progressClassName="custom-toast-progress"/>
        </main>
        <Footer />
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
