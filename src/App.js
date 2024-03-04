import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";


//Main
import MainPage from "./pages/MainPage"
// Navbar
import Navbar from "./Navbar";

// Pages
import Teams from "./pages/Teams";

// Auth
import { useAuth } from "./contexts/AuthContexts";


// AuthPages
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";


// Teams
import Show from "./teams/Show";
import Create from "./teams/Create";
import Edit from "./teams/Edit";
import Social from "./pages/Social";

function App() {
  const { authenticated, onAuthenticated } = useAuth();

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
      <Route path='/social' element={<Social/>}/>
      </>
    );
  }

  return (
    <Router>
    <Navbar/>
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
