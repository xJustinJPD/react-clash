import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContexts';

const Navbar = (props) => {
    const { authenticated, onAuthenticated } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        onAuthenticated(false);
        navigate('/login');
    }

    const handleInputChange = (e) => {
        navigate('/social');
        props.onHandleChange(e)
    }

    return (
            <div className="navbar bg-neutral">
            <div className="navbar-start">
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost bg-base-200 btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral text-white rounded-box w-52">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/teams'>Teams</Link></li>
                <li><Link to='/teams/create'>Create a Team</Link></li>
                <li><Link to='/social'>Social</Link></li>
                <li><Link to='/matches'>Matches</Link></li>

                </ul>
            </div>
            </div>
            <div className="navbar-center">
            <a href="/" className="btn btn-ghost normal-case text-xl text-white">Clash</a>
            </div>
            {location.pathname === '/social' && (
            <div className='d-flex justify-content-center'>
                    <input type="text" placeholder='Search for a user' value={props.searchTerm} onChange={handleInputChange} style={{ height:"65%"}}/>
                </div>
            )}
            <div className="navbar-end">
                            {(authenticated) ? (
                <button className='bg-white' onClick={logout}>Logout</button>
                ) : ""}
                  {authenticated ? (
            // Avatar for authenticated users
            <div className="avatar online pl-2">
              <div className="w-12 rounded-full">
                <Link to='/user'>
                  <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user-avatar" />
                </Link>
              </div>
            </div>
          ) : (
            // Avatar for non-authenticated users
            <div className="avatar offline">
              <div className="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user-avatar" />
              </div>
            </div>
          )}
            </div>
                    </div>
    );
};

export default Navbar;