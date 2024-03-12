import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteBtn from "../components/Delete";
import { useAuth } from "../contexts/AuthContexts"; 

const MatchShow = () => {
    const { id } = useParams();
    const [match, setMatch] = useState(null);
    const navigate = useNavigate();
    const { authenticated, userInfo } = useAuth();

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`http://localhost/api/games/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            setMatch(response.data.data);
            console.log(match)
        })
        .catch(err => {
            console.error(err);
        });
    }, [id, token]);

    if (!match) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Match: {match.id}</h1>
                    <h1 className="text-5xl font-bold">Type: {match.queue_type}</h1>
                    <h1 className="text-5xl font-bold">Team 1: {match.team_1.id}</h1>
                    <h1 className="text-5xl font-bold">Team 2: {match.team_2.id}</h1>
                </div>
                    <>
                        <DeleteBtn className="m-3" id={match.id} resource="games" deleteCallback={() => navigate('/')} />
                    </>
            </div>
        </div>
    );
}

export default MatchShow;