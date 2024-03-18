import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddBtn({team_id, player_username, addCallback}) {
    const [isLoading, setIsLoading] = useState(false);
    const [form, setForm] = useState({
        username: player_username
    });

    const navigate = useNavigate();

    const handleAdd = (e) => {
        setIsLoading(true);
        e.preventDefault();
        let token = localStorage.getItem('token');
        // console.log(token);
        // console.log('submitted', form);

            axios.post(`http://localhost/api/teams/${team_id}/invite-user`, form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('added')
            })
            .catch(err => {
                console.error(err);
            });
        
    };

    return (
        <button onClick={handleAdd} className="btn btn-outline btn-error">
            {isLoading ? "Sent." : "Send"}
        </button>
    );
};