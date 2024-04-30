import { useState } from "react";
import axios from '../../../config/Api';


const CancelRequest = ({ userId, teamId, onCanceled, setError }) => {
    const [loading, setLoading] = useState(false);
    const [local] = axios;
    const handleCancel = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem('token'); 

            
            const response = await local.delete(`/teams/user-requests/${userId}/${teamId}`, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            }); 

            // If the request is successful, notify the parent component
            if (response.status === 200) {
                onCanceled();
            }
        } catch (err) {
            setError('Failed to cancel request.');
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button onClick={handleCancel} disabled={loading}>
                {loading ? 'Cancelling...' : 'Cancel Request'}
            </button>
        </div>
    );
};

export default CancelRequest;
