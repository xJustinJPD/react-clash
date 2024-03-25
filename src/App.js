import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


//Main
import MainPage from "./pages/MainPage"
// Navbar
import Navbar from "./Navbar";

// Pages
import Teams from "./pages/teams/Teams";

// Auth
import { useAuth } from "./contexts/AuthContexts";


// AuthPages
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


// Teams
import Show from "./pages/teams/Show";
import Create from "./pages/teams/Create";
import Edit from "./pages/teams/Edit"



// Matches
import MatchShow from "./pages/matches/Show";
import Matches from "./pages/matches/All";

//user
import Profile from './pages/Socials/viewProfile';
import Social from "./pages/Socials/Social";
import SingleUser from "./pages/Socials/SingleUser"
import EditUser from "./pages/Socials/UpdateUser";


function App() {
  const { authenticated, onAuthenticated } = useAuth();
  const [term, setTerm] = useState("");

  const onHandleChange = (e) => {
      setTerm(e.target.value)
  }

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);

  if(authenticated){
    protectedRoutes = (
      <>
      <Route path='/teams' element={<Teams/>}/>
      <Route path='/teams/:id' element={<Show/>}/>
      <Route path='/teams/:id/edit' element={<Edit/>}/>
      <Route path='/teams/create' element={<Create/>}/>
      <Route path='/social' element={<Social searchTerm={term}/>}/>
      <Route path='/match/:id' element={<MatchShow/>}/>
      <Route path='/matches' element={<Matches/>}/>
      <Route path='/user/:id' element={<SingleUser/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/user/:id/edit' element={<EditUser/>}/>
      </>
    );
  }

  return (
    <Router>
    <Navbar onHandleChange={onHandleChange} searchTerm={term}/>
    <Routes>
    {protectedRoutes}
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      {/* <Route path='*' element={<PageNotFound />} /> */}
      <Route path='/' element={<MainPage/>}/>
      
    </Routes>
  </Router>
  );
}

export default App;
