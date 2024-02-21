import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

// Navbar
import Navbar from "./Navbar";

// Pages
import Teams from "./pages/Teams";

// Auth
import { useAuth } from "./contexts/AuthContexts";
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

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
      <Route path='/' element={<Teams/>}/>
    </Routes>
  </Router>
  );
}

export default App;
