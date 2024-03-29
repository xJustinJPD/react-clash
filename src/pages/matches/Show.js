import React from 'react';
import { useState, useEffect } from 'react';
import axios from '../../config/Api';
import { useParams } from 'react-router-dom';
import UpdateGameForm from './components/UpdateGameForm';
import CancelGameButton from './components/CancelGameButton'; // Import CancelGameButton component
import PlayerCard from './components/PlayerStatsForm';

const MatchShow = () => {
    const { id } = useParams();
    const [local] = axios;
    const [match, setMatch] = useState(null);
    const [team2, setTeam2] = useState(null); // State to track team_2 id
    const [showForm, setShowForm] = useState(false); //state to show form visibility
    const [players1, setPlayers1] = useState([]); // State to track team_1 players
    const [players2, setPlayers2] = useState([]); // State to track team_2 players

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

        const fetchPlayers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await local.get(`/stats/${id}/${match.team_1.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                    console.log(response.data.data)
                    setPlayers1(response.data.data)
            } catch (error) {
                console.error(error);
            }

        };

        // local.get(`/stats/${id}/${match.team_1.id}`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //         .then(response => {
        //             console.log(response.data.data)
        //             setPlayers1(response.data.data)
        //         })
        //         .catch(err => {
        //             console.log(err.response.data)
        //         });

        // local.get(`/stats/${id}/${team2.id}`,{
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //         .then(response => {
        //             console.log(response.data.data)
        //             setPlayers2(response.data.data)
        //         })
        //         .catch(err => {
        //             console.log(err.response.data)
        //         });

        return () => clearInterval(team2Wait);
    }, [id, team2]);

    const toggleFormVisibility = () => {
        setShowForm(!showForm);
    };

    console.log(players1)



            // useEffect(() => {
            //     local.get(`/stats/${id}/${match.team_1.id}`,{
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     })
            //             .then(response => {
            //                 console.log(response.data.data)
            //                 setPlayers1(response.data.data)
            //             })
            //             .catch(err => {
            //                 console.log(err.response.data)
            //             });
            // }, [id]);

            // useEffect(() => {
            //     local.get(`/stats/${id}/${match.team_2.id}`,{
            //         headers: {
            //             Authorization: `Bearer ${token}`
            //         }
            //     })
            //             .then(response => {
            //                 console.log(response.data.data)
            //                 setPlayers2(response.data.data)
            //             })
            //             .catch(err => {
            //                 console.log(err.response.data)
            //             });
            // }, [id]);


            // const players1List = players1.map((user, i) => (
            //     <PlayerCard key={user.id} user={user} />
            // ));

            // const players2List = players2.map((user, i) => (
            //     <PlayerCard key={user.id} user={user} />
            // ));

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
               
                {showForm && <UpdateGameForm gameId={id} team1Creator={match.team_1.creator} team2Creator={match.team_2.creator} />}
            </div>
        </div>
    );
}

export default MatchShow;
