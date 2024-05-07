
import RegisterForm from "./components/RegisterForm";
import { useAuth } from "./contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const navigate = useNavigate()
    const { authenticated } = useAuth();

    return (
    <div className="pb-36">
        {(!authenticated) ? (
        <RegisterForm />
        ) : (
        navigate('/login')
        )}
        
    </div>
    );
    }
    
    export default RegisterPage;