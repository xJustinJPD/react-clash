import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from '../config/Api';
import DeleteBtn from "../components/Delete";
import { useAuth } from "../contexts/AuthContexts"; 
import MatchBtn from "../matches/Create";
import Friend from "./components/FriendCard";
import UserCard from "../pages/components/UserCard";

const Show = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();
    const { authenticated, userInfo } = useAuth();
    const [friends, setFriendsList] = useState([]);
    const [teamUserList, setTeamUserList] = useState([]);

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
            setTeamUserList(response.data.data.users)
        })
        .catch(err => {
            console.error(err);
        });
    }, [id, token]);

    useEffect(() => {
        axios.get("/friends", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setFriendsList(response.data.friends);
            console.log("friends", response.data.friends);
        })
        .catch(err => {
            console.error(err);
        });
    }, [token]);

    const friendList = friends.map((friend, i) => (
        <Friend key={friend.id} friend={friend.friend} team_id={team.id} />
    ));

    const userList = teamUserList.map((user, i) => (
        <UserCard key={user.id} user={user} />
    ));

    console.log(userInfo && userInfo.id);

    if (!team) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);
    return (
        <>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                {team.image}
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
        <div className="text-3xl font-bold text-center my-4">Users in Team:</div>
            <hr className="my-4" />
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {userList}
            </div>
        <div className="text-3xl font-bold text-center my-4">Add Friends To Team:</div>
            <hr className="my-4" />
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {friendList}
            </div>
        </>

    );
} 

export default Show;
