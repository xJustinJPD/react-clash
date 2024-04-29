import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useParams, useNavigate  } from 'react-router-dom';
import UpdateGameForm from './components/UpdateGameForm';
import CancelGameButton from './components/CancelGameButton'; // Import CancelGameButton component
import PlayerCard from './components/PlayerStatsForm';

const MatchShow = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [local] = axios;
    const [match, setMatch] = useState(null);
    const [team2, setTeam2] = useState(null); // State to track team_2 id
    const [showForm, setShowForm] = useState(false); //state to show form visibility

    const token = localStorage.getItem('token');


    useEffect(() => {
        const fetchMatch = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await local.get(`/games/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setMatch(response.data.data);
                setTeam2(response.data.data.team_2); 
            } catch (error) {
                console.error(error);
            }

        };

        if (team2 === null) {
            fetchMatch();
        }

        const team2Wait = setInterval(() => {
            if (team2 === null) {
                fetchMatch();
            }
        }, 1000);
        const matchCancelled = setInterval(()=> {
            if (match.status === 'accepted'){
                fetchMatch();
            }
        },5000);


      
        return () => {
            clearInterval(team2Wait);
            clearInterval(matchCancelled);
        }
    }, [id, team2]);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    if (match != null && match.status === 'cancelled') {
        // Redirect to teams page
        navigate('/teams');
        // Show alert
        alert('The other team has forfeited.');
        // Return null as component will unmount due to redirection
        return null;
    }

    if (!match) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);
    
    if (team2 === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <h1 className="text-5xl font-bold">Searching for a game</h1>
            </div>
        );
    }
    

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {/* Match Data */}
            <div className="col-span-1">
                <h1 className="text-5xl font-bold">Match: {match.id}</h1>
                <h1 className="text-5xl font-bold">Type: {match.queue_type}</h1>
                {match.team_1 && <h1 className="text-5xl font-bold">Team 1: {match.team_1.id}</h1>}
                {match.team_2 && <h1 className="text-5xl font-bold">Team 2: {match.team_2.id}</h1>}
            </div>
            
            {/* Form */}
            <div className="col-span-1">
            <CancelGameButton gameId={id} /> 
                <button onClick={toggleFormVisibility} className="btn btn-primary mb-4">Update Game</button>
               
                {showForm && <UpdateGameForm gameId={id} team1Creator={match.team_1.creator} team2Creator={match.team_2.creator} team1id={match.team_1.id} team2id={match.team_2.id} />}
            </div>
        </div>
    );
}

export default MatchShow;
