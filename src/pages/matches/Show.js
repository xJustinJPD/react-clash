import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useParams, useNavigate  } from 'react-router-dom';
import UpdateGameForm from './components/UpdateGameForm';
import CancelGameButton from './components/CancelGameBtn.js'; 
import CancelMatchMakeBtn from './components/CancelMatchMakeBtn.js';
import PlayerCard from './components/PlayerStatsForm';

const MatchShow = ({setError}) => {
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
            } catch (err) {
                console.error(err);
                if (err.response && err.response.data && err.response.data.message) {
                    setError(err.response.data.message);
                }
            }

        };



        if (team2 === null) {
            fetchMatch();
        }

        const team2Wait = setInterval(() => {
            if (team2 === null) {
                fetchMatch();
            }
        }, 2000);
        if (team2 !== null){
            const matchCancelled = setInterval(()=> {
                if (match.status === 'accepted' && team2 !== null){
                    fetchMatch();
                }
            },5000);


            return () => {
                clearInterval(matchCancelled);
            }
        }
        




      
        return () => {
            clearInterval(team2Wait);
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
            <div className="flex flex-col justify-center items-center h-screen">
            <div className="flex items-center mb-5">
                <h1 className="text-5xl font-bold mr-2">Searching for a game</h1>
                <span className="loading loading-dots loading-lg" style={{ marginTop: "2rem" }}></span>
            </div>
            <CancelMatchMakeBtn gameId={id} setError={setError} /> 
        </div>

        );
    }


    

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {/* Team 1 data*/}
            <div className="col-span-1 justify-center m-5">
                <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={`${match.team_1?.image}`} alt="" className="m-6 rounded w-24 h-24" />
                    <div>
                    {match.team_1 && <h1 className="text-3xl font-bold" >{match.team_1.name}</h1>}
                    </div>
                </div>
                </div>
            </div>
            
            
            {/* Form */}
            <div className="col-span-1 my-5">
            <div className="flex flex-col w-full border-opacity-50">
                <div className="grid h-20 card rounded-box place-items-center"><h1 className='text-3xl'><b>{match.queue_type} Playlist</b></h1></div>
                <div className="grid h-20 card rounded-box place-items-center"><CancelGameButton gameId={id} setError={setError} /></div>
                <div className="divider">OR</div>
                <div className="grid h-20 card rounded-box place-items-center"><button onClick={toggleFormVisibility} className="btn btn-primary mb-4">Complete Game</button>
                {showForm && <UpdateGameForm gameId={id} team1Creator={match.team_1.creator} team2Creator={match.team_2.creator} team1id={match.team_1.id} team2id={match.team_2.id} />}
                </div>
            </div>
            </div>
            {/* Team 2 Data */}
            <div className="col-span-1 justify-center m-5">
                <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={`${match.team_2?.image}`} alt="" className="m-6 rounded w-24 h-24" />
                    <div>
                    {match.team_1 && <h1 className="text-3xl font-bold" >{match.team_2.name}</h1>}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MatchShow;
