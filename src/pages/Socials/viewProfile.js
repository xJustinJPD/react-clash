import React, { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { AcceptRequestBtn, RejectRequestBtn } from './components/AcceptRejectButtons';
import { useAuth } from '../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const ViewProfile = () => {
  const { authenticated, onAuthenticated } = useAuth();
  const [user, setUser] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const token = localStorage.getItem('token');
  const [local,picture] = axios;
  const navigate = useNavigate();

  const logout = () => {
    onAuthenticated(false);
    navigate('/login');
  }

  useEffect(() => {
    local.get('/auth/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setUser(response.data.user);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  useEffect(() => {
    local.get('/requests/received', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setReceivedRequests(response.data.requests);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  useEffect(() => {
    local.get('/requests/sent', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setSentRequests(response.data.requests);
    })
    .catch(err => {
      console.error(err);
    });
  }, [token]);

  const fetchReceivedRequests = () => {
    local.get('/requests/received', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setReceivedRequests(response.data.requests);
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <div className="flex justify-between">
      <div className="grid grid-cols-8 gap-4 bg-white p-8 shadow-lg rounded-md">
        <div className="col-span-8">
          <h1 className="text-3xl font-bold mb-4">Username: {user?.username}</h1>
          <img src={`http://localhost:80/images/${user?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" />
          <p className="text-gray-600"><b>Current Email: </b>{user?.email}</p>
          <p className="text-gray-600"><b>Description: </b>{user?.description}</p>
          <p className="text-gray-600"><b>Kills: </b>{user?.kills}</p>
          <p className="text-gray-600"><b>Deaths: </b>{user?.deaths}</p>
          <p className="text-gray-600"><b>Rank: </b>{user?.rank}</p>
          <p className="text-gray-600"><b>KD Ratio: </b>{user['user-kd-ratio']}</p>
          <p className="text-gray-600"><b>Win/loss Ratio: </b>{user['user-win-ratio']}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 bg-white p-8 shadow-lg rounded-md ml-4">
        {authenticated ? (
          <button className="btn btn-error btn-lg mb-4" onClick={logout}>
            Logout
          </button>
        ) : null}
        <div className="border-b-2 pb-4">
          <h1 className="text-3xl font-bold mb-4">Received Friend Requests:</h1>
          {receivedRequests.map(request => (
            <div key={request.id} className="flex items-center justify-between">
              <p className="mr-4">{request.user_id}</p>
              <div>
                <AcceptRequestBtn requestId={request.id} onSuccess={fetchReceivedRequests} />
                <RejectRequestBtn requestId={request.id} onSuccess={fetchReceivedRequests} />
              </div>
            </div>
          ))}
        </div>
        <div className="border-b-2 pt-4 pb-4">
          <h1 className="text-3xl font-bold mb-4">Sent Friend Requests:</h1>
          {sentRequests.map(request => (
            <div key={request.id}>
              <p>{request.friend_id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
