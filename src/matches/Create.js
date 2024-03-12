import { useState } from 'react';
import axios from '../config/Api';
import { useNavigate } from 'react-router-dom';

export default function MatchBtn({id, resource, matchCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    let matchId;

    const [form, setForm] = useState({
        team_id_1: id,
        queue_type: "1v1"
    });

    const onMatch = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');

        axios.post(`/games`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data.data);
                    matchId = response.data.data.id;
                    navigate(`/match/${matchId}`);
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