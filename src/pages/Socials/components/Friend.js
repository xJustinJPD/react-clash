import { useState } from 'react';
import axios from '../../../config/Api';
import { useNavigate } from 'react-router-dom';

export default function FriendBtn({id, resource, friendCallback, setError, disabled}) {
    const [isLoading, setIsLoading] = useState(false);
    const [local] = axios;
    const navigate = useNavigate(); 
    const onFriend = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');
    
        local.post(`/users/${id}/send-request`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err.response.data)
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    };

    return (
       
        disabled ? (
            <button className="btn btn-secondary">SENT</button>
        ) :  
        (<button className="btn btn-outline btn-success"  onClick={onFriend}>
        {isLoading ? "Sending..." : "Send Friend Request"}
        </button>
        )
     
    );
};