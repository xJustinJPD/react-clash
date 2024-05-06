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
import MatchStats from "./pages/matches/Edit";
import CreateAdminUser from "./pages/Socials/CreateAdminUser";
import Footer from "./Footer";
import UpdatePassword from "./pages/Socials/components/UpdatePassword";
import PageNotFound from './pages/PageNotFound';
import DiscordAuthCallback from "./components/DiscordAuthCallback";
function App() {
  const { authenticated, onAuthenticated } = useAuth();
  const [term, setTerm] = useState("");
  const [error, setError] = useState(null);
  const onHandleChange = (e) => {
      setTerm(e.target.value)
  }

  let protectedRoutes;

  useEffect(() => {
    if(localStorage.getItem('token')){
      onAuthenticated(true);
    }
  }, []);

  const clearError = () => {
    setError(null);
  };

  // Set up interval to clear error every 3 seconds
  useEffect(() => {
    let errors;

    if (error) {
      errors = setInterval(() => {
        clearError();
      }, 4000);
    }

    // Clean up interval on component unmount or when error is cleared
    return () => clearInterval(errors);
  }, [error]);

  if(authenticated){
    protectedRoutes = (
      <>
      <Route path='/teams' element={<Teams setError={setError}/>}/>
      <Route path='/teams/:id' element={<Show setError={setError}/>}/>
      <Route path='/teams/:id/edit' element={<Edit setError={setError}/>}/>
      <Route path='/teams/create' element={<Create setError={setError}/>}/>
      <Route path='/social' element={<Social searchTerm={term} setError={setError} />}/>
      <Route path='/match/:id' element={<MatchShow setError={setError}/>}/>
      <Route path='/match/:id/:team1id/:team2id/stats' element={<MatchStats setError={setError}/>}/>
      <Route path='/matches' element={<Matches setError={setError}/>}/>
      <Route path='/user/:id' element={<SingleUser setError={setError}/>}/>
      <Route path='/profile' element={<Profile setError={setError}/>}/>
      <Route path='/user/:id/edit' element={<EditUser setError={setError}/>}/>
      <Route path='/create/adminUser' element={<CreateAdminUser />} />
      <Route path="/user/:id/password" element={<UpdatePassword setError={setError} />} />
      </>
    );
  }

  return (
    <Router>
    <Navbar onHandleChange={onHandleChange} searchTerm={term} error={error}/>
    <Routes>
    {protectedRoutes}
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      {/* <Route path='*' element={<PageNotFound />} /> */}
      <Route path='/' element={<MainPage/>}/>
      <Route path='*' element={<PageNotFound />} />
      <Route path="/auth/discord/callback" element={<DiscordAuthCallback />} />
    </Routes>
    <Footer/>
  </Router>
  );
}

export default App;
