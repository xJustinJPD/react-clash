import { useState } from "react";
import axios from '../../../config/Api';


const CancelRequest = ({ userId, teamId, onCanceled }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [local] = axios;
    const handleCancel = async () => {
        setLoading(true);
        setError(null);

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
        } catch (error) {
            setError('Failed to cancel request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <button onClick={handleCancel} disabled={loading}>
                {loading ? 'Cancelling...' : 'Cancel Request'}
            </button>
        </div>
    );
};

export default CancelRequest;
