import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useAuth } from '../../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom'; 
import ReceivedRequests from './components/RecievedRequests';
import SentRequests from './components/SentRequests';
import ReceivedTeams from './components/ReceivedTeams';
// import LoginDiscord from './LoginDiscord';


const ViewProfile = ({setError}) => {
  const { authenticated, onAuthenticated } = useAuth();
  const [user, setUser] = useState([]); 
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedTeams, setReceivedTeams] = useState([]);
  const token = localStorage.getItem('token');
  const [local] = axios; 
  const navigate = useNavigate();

const {discordInfo} = localStorage.getItem('discordInfo');

  const logout = () => {
    onAuthenticated(false);
    navigate('/login');
  };


  const fetchReceivedRequests = async () => {

    try {
      const response = await local.get('/requests/received', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReceivedRequests(response.data.requests);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
    }
    }
  };
  const fetchReceivedTeams = async () => {
    try {
      const response = await local.get('/user-teamrequests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setReceivedTeams(response.data.requests);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
    }
    }
  };

  useEffect(() => {
    const userData = async () => {
      try {
        const response = await local.get('/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
      }
      }
    };
    const fetchSentRequests = async () => {
      try {
        const response = await local.get('/requests/sent', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSentRequests(response.data.requests);
      } catch (err) {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
      }
      }
    };

    console.log(user)

    userData();
    fetchReceivedRequests();
    fetchSentRequests();
    fetchReceivedTeams();
    
  
  }, [token, local]);

  

  let recievedTimer;

  useEffect(() => {
    recievedTimer = setInterval(fetchReceivedRequests, 5000);

    return () => {
            clearInterval(recievedTimer);
          }; 
  }, []);

  

  const handleCancelRequest = (requestId) => {
    const updatedRequests = sentRequests.filter(request => request.friend_info.id !== requestId);
    setSentRequests(updatedRequests);
  };

  
  {discordInfo ? (
    <>
        <img width="48" height="48" src="https://img.icons8.com/fluency/48/discord-logo.png" alt="discord-logo"/>
      <p>{discordInfo}</p>
    </>
  ) : (
    <Link to={'/user/discord-login'}>
    <img width="48" height="48" src="https://img.icons8.com/fluency/48/discord-logo.png" alt="discord-logo"/>
  </Link>
  )}

  return (
    <div className="justify-between pb-36">
      <div className="grid md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-4 p-8 rounded-md">
        <div className="col-span-1">
          <img src={`${user?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" />
          <h1 className="text-3xl font-bold mb-4">{user?.username}</h1>
          
          <p className="text-gray-600"><b>Email: </b>{user?.email}</p>

          <div className='flex mt-5'>
            <div className='mr-2'><p><b>Kills: </b>{user.kills}</p></div>
            <div className='mr-2'><p><b>Deaths: </b>{user.deaths}</p></div>
            <div className='mr-2'><p><b>Ratio: </b>{user["user-kd-ratio"]}</p></div>

          </div>
          <div className='flex mt-5'>
            <div className='mr-2'><p><b>Wins: </b>{user.wins}</p></div>
            <div className='mr-2'><p><b>Losses: </b>{user.losses}</p></div>
            <div className='mr-2'><p><b>Ratio: </b>{user["user-win-ratio"]}</p></div>
          </div>

        <div className='flex mt-5'>
          <div>
        <Link to={`/user/${user?.id}/edit`}><button className="btn btn-outline btn-lg btn-primary">Edit Profile</button></Link>
      </div>
      <Link to={'/user/discord-login'}>
    <img width="48" height="48" src="https://img.icons8.com/fluency/48/discord-logo.png" alt="discord-logo"/>
  </Link>
      <div>
        <Link to={`/user/${user?.id}/password`} ><button className="btn btn-outline btn-lg btn-primary mx-2">Update Password</button></Link>
      </div>
      <div>
      {authenticated ? (
          <button className="btn btn-error btn-lg mx-2" onClick={logout}>
            Logout
          </button>
        ) : null}
      </div>
      </div>
      </div>
      <div className="grid grid-cols-1 bg-white p-8 shadow-lg rounded-md ml-4">

        <ReceivedRequests receivedRequests={receivedRequests} fetchReceivedRequests={fetchReceivedRequests} />
        <SentRequests sentRequests={sentRequests} onCancelRequest={handleCancelRequest} />
        <ReceivedTeams teams={receivedTeams} fetchReceivedTeams={fetchReceivedTeams} />

      </div>
    </div>
    <div className='grid grid-cols-1'>
        {/* CHART */}
    </div>
    </div>
  );
};

export default ViewProfile;
