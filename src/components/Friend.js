import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function FriendBtn({id, resource, friendCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onFriend = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');
    
        axios.post(`http://localhost/api/users/${id}/send-request`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data);
            // navigate('/');
        })
        .catch(err => {
            console.log(err.response.data)
        });
    };

    return (
        <button onClick={onFriend} className="btn btn-outline btn-success">
            {isLoading ? "Sent." : "Send"}
        </button>
    );
};