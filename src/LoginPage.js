import LoginForm from "./components/LoginForm";
import { useAuth } from "./contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate()
    const { authenticated } = useAuth();

    return (
    <div className="pb-36">
        {(!authenticated) ? (
        <LoginForm />
        ) : (
        navigate('/')
        )}
        
    </div>
    );
    }
    
    export default LoginPage;