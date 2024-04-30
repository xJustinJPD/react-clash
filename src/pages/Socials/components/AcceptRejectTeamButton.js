import React, { useState } from 'react';
import axios from '../../../config/Api';
//teams buttons
const AcceptTeamBtn = ({ teamId, onSuccess, setError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [local] = axios;
  const handleAccept = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    local.put(`/teams/${teamId}/accept-invite`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        onSuccess();
      })
      .catch(err => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.message) {
          setError(err.response.data.message);
      }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button onClick={handleAccept} disabled={isLoading} className="px-4 py-2 bg-green-500 rounded text-white ml-2">
      {isLoading ? 'Accepting...' : 'Accept'}
    </button>
  );
};

const RejectTeamBtn = ({ teamId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [local] = axios;
  
  const handleReject = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');
    // console.log(teamId)
    local.delete(`/teams/${teamId}/reject-invite`, {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
      .then(response => {
        onSuccess();
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <button onClick={handleReject} disabled={isLoading} className="px-4 py-2 bg-red-500 rounded text-white ml-2">
      {isLoading ? 'Rejecting...' : 'Reject'}
    </button>
  );
};

export { AcceptTeamBtn, RejectTeamBtn };
