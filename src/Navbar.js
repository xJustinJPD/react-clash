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
            {/* <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
            </button> */}
                            {(authenticated) ? (
                <button className='bg-white' onClick={logout}>Logout</button>
                ) : ""}
            </div>
                    </div>
    );
};

export default Navbar;