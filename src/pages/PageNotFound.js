// Import necessary dependency
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

// PageNotFound component
const PageNotFound = () => {
  const navigate = useNavigate();
  // Style for error message
  const errorStyle = {
    marginTop: '20px',
  };
  const { authenticated } = useAuth();
  // JSX structure for the PageNotFound component
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center" style={errorStyle}>
        {/* Error message div with red background */}
        
        {/* Link to go back to the homepage */}
        {(authenticated)?( <Link to="/">
        <div className="bg-red-500 text-white font-bold p-4">
        <p className="text-xl">Page Not Found</p>
          <p>The page you are looking for may have been moved or doesn't exist.</p>
        </div>
          <button className="mt-4 bg-primary text-white p-2 rounded">
            Go back to the homepage
          </button>
        </Link>):(navigate('/login') )}
       
      </div>
    </div>
  );
};

export default PageNotFound;