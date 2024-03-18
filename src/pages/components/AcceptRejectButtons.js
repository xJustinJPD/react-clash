import React, { useState } from 'react';
import axios from '../../config/Api';

const AcceptRequestBtn = ({ requestId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAccept = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    axios
      .put(`/requests/${requestId}/accept`, {}, {
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
    <button onClick={handleAccept} disabled={isLoading} className="px-4 py-2 bg-green-500 rounded text-white ml-2">
      {isLoading ? 'Accepting...' : 'Accept'}
    </button>
  );
};

const RejectRequestBtn = ({ requestId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleReject = () => {
    setIsLoading(true);
    const token = localStorage.getItem('token');

    axios
      .put(`/requests/${requestId}/reject`, {}, {
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

export { AcceptRequestBtn, RejectRequestBtn };
