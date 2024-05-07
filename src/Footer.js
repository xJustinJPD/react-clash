import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContexts';

const Footer = () => {
    const { authenticated, onAuthenticated } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <footer className="footer p-2 sm:p-10 bg-primary text-base-content text-white fixed bottom-0 w-full flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center">
                <img width="50" height="50" viewBox="0 0 24 24" src='https://clash-images.s3.eu-north-1.amazonaws.com/images/footer.JPG' fillRule="evenodd" clipRule="evenodd" className="fill-current mr-4 rounded"/>
                   
                <div>
                    <p>Clash</p>
                    <p>A Ranked System: Call Of Duty Edition</p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center hidden sm:block">
                <nav className="sm:ml-4">
                    <h6 className="footer-title">Pages</h6> 
                    <Link to='/' className="mr-4 sm:mr-8">Home</Link>
                    <Link to='/teams' className="mr-4 sm:mr-8">Teams</Link>
                    <Link to='/social'>Social</Link>
                </nav> 
            </div>
        </footer>
    );
};

export default Footer;
