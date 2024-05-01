import { useState } from 'react';
import axios from '../../config/Api';
import { useNavigate } from 'react-router-dom';

export default function MatchBtn({id, size, matchCallback, users, setError}) {
    const [isLoading, setIsLoading] = useState(false);
    const [local] = axios;
    const navigate = useNavigate();

   

    let matchId;
//switch works like a multiple conditions but its much cleaner
    const determineQueueType = (teamSize) => {
        switch (teamSize) {
            case 1:
                return "1v1";
            case 2:
                return "2v2";
            case 3:
                return "3v3";
            case 4:
                return "4v4";
            default:
                return "Unknown";
        }
    };
 
    const [form, setForm] = useState({
        team_id_1: id,
        queue_type: determineQueueType(size)
    });

    const onMatch = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');
        if (size !== users.length) {
            setError("Team size doesn't match the number of users.");
            setIsLoading(false);
            return;
        }
        local.post(`/games`, form, {
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
                    if (err.response && err.response.data && err.response.data.message) {
                        setError(err.response.data.message);
                    }
                    setIsLoading(false);
                });
    };

    return (
        <button onClick={onMatch} className="btn btn-outline btn-success">
            {isLoading ? "Searching..." : "Matchmake"}
        </button>
    );
};