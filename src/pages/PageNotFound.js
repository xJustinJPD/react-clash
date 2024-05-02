// Import necessary dependency
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
// PageNotFound component
const PageNotFound = () => {
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
        <div className="bg-red-500 text-white font-bold p-4">
          <p className="text-xl">Page Not Found</p>
          {(authenticated)?(<p>The page you are looking for may have been moved or doesn't exist.</p>):(<p>It seems you may not be authenticated to view this page. Please Login</p>)}
          
        </div>
        {/* Link to go back to the homepage */}
        {(authenticated)?( <Link to="/">
          <button className="mt-4 bg-primary text-white p-2 rounded">
            Go back to the homepage
          </button>
        </Link>):( <Link to="/login">
          <button className="mt-4 bg-primary text-white p-2 rounded">
            Go back to the login
          </button>
        </Link>)}
       
      </div>
    </div>
  );
};

export default PageNotFound;