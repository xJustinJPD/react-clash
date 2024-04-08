import axios from '../../../config/Api';

const CancelRequestBtn = ({ friendId, onCancelRequest }) => {
  const token = localStorage.getItem('token');
  const [local] = axios;

  const handleCancel = () => {
    console.log(`Cancelling friend request for user ID: ${friendId}`);
    local.delete(`/requests/${friendId}/cancel`, { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      onCancelRequest(friendId); 
    })
    .catch(err => {
      console.error(err);
    });
  };

  return (
    <button className="btn btn-error" onClick={handleCancel}>Cancel Request</button>
  );
};

export default CancelRequestBtn;