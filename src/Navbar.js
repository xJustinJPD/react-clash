import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './contexts/AuthContexts';

const Navbar = (props) => {
  const { authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    navigate('/social');
    props.onHandleChange(e);
  };

  return (
    <div className="">
      <div className="navbar bg-neutral">
        <div className="navbar-start text-white">
          <Link to='/'>
            <img src="https://clash-images.s3.eu-north-1.amazonaws.com/images/clash logo overall.JPG " alt="Logo" className="h-10 rounded-full" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-white px-1">
            <li><Link to='/'>Home</Link></li>
            <li className='pt-2'>•</li>
            <li><Link to='/teams'>Teams</Link></li>
            <li className='pt-2'>•</li>
            <li><Link to='/social'>Social</Link></li>
          </ul>
        </div>
        <div className="lg:hidden block">
          <div className="dropdown">
            <button tabIndex={0} role="button" className="btn btn-white btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/teams'>Teams</Link></li>
              <li><Link to='/social'>Social</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-end">
          {authenticated ? (
            // Avatar for authenticated users
            <div className="avatar online pl-2">
              <div className="w-12 rounded-full">
                <Link to='/profile'>
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
      {props.error && (
        <div className="navbar">
          <div className="navbar-item w-full flex justify-center items-center">
            <div role="alert" className="alert alert-error w-full flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{props.error}</span>
            </div>
          </div>
        </div>
      )}
      {location.pathname === '/social' && (
        <div className='flex justify-center m-5'>
          <div className='flex justify-center'>
            <label className="input input-bordered flex items-center gap-2">
              <input type="text" className="grow" placeholder="Search Users" value={props.searchTerm} onChange={handleInputChange} />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
