import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

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
      <Route path='/teams/:id' element={<Show/>}/>
      <Route path='/teams/:id/edit' element={<Edit/>}/>
      <Route path='/teams/create' element={<Create/>}/>
      <Route path='/social' element={<Social searchTerm={term}/>}/>
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
      <Route path='/' element={<Teams/>}/>
    </Routes>
  </Router>
  );
}

export default App;
