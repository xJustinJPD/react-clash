import { useEffect, useState } from "react";
import axios from '../../config/Api';
import { useParams } from "react-router";
import PlayerCard from "./components/PlayerStatsForm";
import { Link } from "react-router-dom";

const MatchStats = () => {
    const { id, team1id, team2id } = useParams();
    const [players1, setPlayers1] = useState([]); // State to track team_1 players
    const [players2, setPlayers2] = useState([]); // State to track team_2 players

    const [local] = axios;
    let token = localStorage.getItem('token');

    useEffect(() => {
        local.get(`/stats/${id}/${team1id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data.data)
                    setPlayers1(response.data.data)
                })
                .catch(err => {
                    console.log(err.response.data)
                });
    }, [id]);

    useEffect(() => {
        local.get(`/stats/${id}/${team2id}`,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data.data)
                    setPlayers2(response.data.data)
                })
                .catch(err => {
                    console.log(err.response.data)
                });
    }, [id]);

            const players1List = players1.map((user, i) => (
                <PlayerCard key={user.id} user={user}/>
            ));

            const players2List = players2.map((user, i) => (
                <PlayerCard key={user.id} user={user} />
            ));

    return (
            <div>
            <div className='flex justify-center mt-10'>
                <h1><b>Update Your Teams Statistics</b></h1>
            </div>
            <div className='flex justify-center mb-10'>
                <h1>(Update each players' statistics and submit for each individual player)</h1>
            </div>
            <div className='grid grid-cols-3 gap-6 flex justify-center m-8'>
                <b>Players:</b> {players1List}
            </div>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-8'>
                {players2List}
            </div>
            <div className='flex justify-center m-10'>
            <Link to={`/teams`}><button className="btn btn-wide btn-primary">
                        Back To Teams
                        </button></Link>
            </div>
            </div>
        
    );
};

export default MatchStats;