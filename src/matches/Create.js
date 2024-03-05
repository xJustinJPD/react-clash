import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MatchBtn({id, resource, matchCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        team_id_1: "",
        queue_type: ""
    });

    const onMatch = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');

        axios.post(`http://localhost/api/games`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data);
                    matchCallback(id);
                    // navigate('/');
                })
                .catch(err => {
                    console.log(err.response.data)
                });
    };

    return (
        <button onClick={onMatch} className="btn btn-outline btn-success">
            {isLoading ? "Searching..." : "Matchmake"}
        </button>
    );
};