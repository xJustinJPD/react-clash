import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from '../config/Api';
import DeleteBtn from "../components/Delete";
import { useAuth } from "../contexts/AuthContexts"; 
import MatchBtn from "../matches/Create";

const Show = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();
    const { authenticated, userInfo } = useAuth();

    const token = localStorage.getItem('token');
    
    useEffect(() => {
        axios.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            setTeam(response.data.data);
        })
        .catch(err => {
            console.error(err);
        });
    }, [id, token]);

    console.log(userInfo && userInfo.id);

    if (!team) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">{team.name}</h1>
                    <p className="py-6">{team.size} Size</p>
                    <p className="py-6">Level {team.wins}</p>
                    <p className="py-6">{team.losses}</p>
                </div>
                
                {authenticated && ((userInfo && userInfo.id === team.creator) || (userInfo && userInfo.role.includes('admin'))) && (
                    <>
                        <Link to={`/teams/${team.id}/edit`}><button className="btn btn-outline btn-primary m-3">Edit</button></Link>
                        <DeleteBtn className="m-3" id={team.id} resource="teams" deleteCallback={() => navigate('/')} />
                        <MatchBtn id={team.id}/>
                    </>
                )}
            </div>
        </div>
    );
}

export default Show;
