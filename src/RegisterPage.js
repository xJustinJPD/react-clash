
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate()
    const { authenticated } = useAuth();

    return (
    <>
        {(!authenticated) ? (
        <RegisterForm />
        ) : (
        navigate('/login')
        )}
        
    </>
    );
    }
    
    export default RegisterPage;