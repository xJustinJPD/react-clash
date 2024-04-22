import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useAuth } from '../../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom'; 
import ReceivedRequests from './components/RecievedRequests';
import SentRequests from './components/SentRequests';
import ReceivedTeams from './components/ReceivedTeams';



const ViewProfile = () => {
  const { authenticated, onAuthenticated } = useAuth();
  const [user, setUser] = useState([]); 
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [receivedTeams, setReceivedTeams] = useState([]);
  const [sentTeams, setSentTeams] = useState([]);
  const token = localStorage.getItem('token');
  const [local] = axios; 
  const navigate = useNavigate();

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
    } catch (error) {
      console.error(error);
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
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await local.get('/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error(error);
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
      } catch (error) {
        console.error(error);
      }
    };

    
    

    fetchData();
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

  return (
    <div className="flex justify-between">
      <div className="grid grid-cols-8 gap-4 bg-white p-8 shadow-lg rounded-md">
        <div className="col-span-8">
          <h1 className="text-3xl font-bold mb-4">Username: {user?.username}</h1>
          <img src={`${user?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" />
          <p className="text-gray-600"><b>Current Email: </b>{user?.email}</p>
          <p className="text-gray-600"><b>Description: </b>{user?.description}</p>
          <p className="text-gray-600"><b>Kills: </b>{user?.kills}</p>
          <p className="text-gray-600"><b>Deaths: </b>{user?.deaths}</p>
          <p className="text-gray-600"><b>Rank: </b>{user?.rank}</p>
          <p className="text-gray-600"><b>KD Ratio: </b>{user['user-kd-ratio']}</p>
          <p className="text-gray-600"><b>Win/loss Ratio: </b>{user['user-win-ratio']}</p>
        </div>
      </div>
      <div>
        <Link to={`/user/${user?.id}/edit`}><button className="btn btn-outline btn-primary m-3">Edit</button></Link>
      </div>
      <div className="grid grid-cols-1 bg-white p-8 shadow-lg rounded-md ml-4">
        {authenticated ? (
          <button className="btn btn-error btn-lg mb-4" onClick={logout}>
            Logout
          </button>
        ) : null}
        <ReceivedRequests receivedRequests={receivedRequests} fetchReceivedRequests={fetchReceivedRequests} />
        <SentRequests sentRequests={sentRequests} onCancelRequest={handleCancelRequest} />
        <ReceivedTeams teams={receivedTeams} fetchReceivedTeams={fetchReceivedTeams} />

      </div>
    </div>
  );
};

export default ViewProfile;
