import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import axios from '../../config/Api';
import DeleteBtn from "../../components/Delete";
import { useAuth } from "../../contexts/AuthContexts"; 
import MatchBtn from "../matches/Create";
import Friend from "./components/FriendCard";
import UserCard from "../Socials/components/UserCard";
import SentRequests from "./components/SentRequestCard";

const Show = ({setError}) => {
    const { id } = useParams();
    const [local] = axios;
    const [team, setTeam] = useState();
    const navigate = useNavigate();
    const { authenticated, userInfo } = useAuth();
    const [friends, setFriendsList] = useState([]);
    const [teamUserList, setTeamUserList] = useState([]);
    const [requestsSent, setRequestSent] = useState([]);


    const token = localStorage.getItem('token');
   
    useEffect(() => {
        local.get(`/teams/${id}`, {
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
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            }
        });
    }, [id, token]);

    useEffect(() => {
        local.get("/friends", {
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
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            }
        });
    }, [token]);

    const fetchSentRequests = () => {
        local.get(`/teams/${id}/userRequests`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setRequestSent(response.data.invites);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            }
        });
    };

    useEffect(() => {
        fetchSentRequests();
    }, [id, token]);

    const filteredFriends = friends.filter(friend => !requestsSent.some(request => request.user.id === friend.friend.id));

    // console.log(filteredFriends);
    
    const friendList = filteredFriends.map((friend, i) => (
        //error when clicking on the team for the first time
        team ? (
            <Friend key={friend.id} friend={friend.friend} setError={setError} team_id={team.id} addCallback={fetchSentRequests} />
        ) : (
            //it wouldnt get here until it checks if team is available
            <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>
        )
    ));
    

    const userList = teamUserList.map((user, i) => (
        <UserCard key={user.id} user={user}  setError={setError} />
    ));

    const sentUsers = requestsSent.map((request, i) => (
        <SentRequests key={request.user.id} user={request.user}  setError={setError} teamId={request.team_id} onCanceled={fetchSentRequests} />
    ));
  

    if (!team) return (<div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);
    // console.log(team.image, "show")
    return (
        <div className="pb-36">
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={team.image} alt={team.name}   className="max-w-sm rounded-lg shadow-2xl h-[200px] w-[200px] md:h-[250px] md:w-[250px] lg:h-[300px] lg:w-[300px] xl:h-[350px] xl:w-[350px]" />
                        <div className="flex flex-col justify-center ml-6">
                        <h1 className="text-5xl font-bold mb-5">{team.name}</h1>
                        <p className="text-lg py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                            {team.size}
                            </p>
                        <p className="text-lg py-2">Wins: {team.wins}</p>
                        <p className="text-lg py-2">Losses: {team.losses}</p>
                        <p className="text-lg py-2">Rank: {team.rank}</p>
                        <p className="text-lg py-2">Win Ratio: {team["team-win-ratio"]}</p>
                        {authenticated && ((userInfo && userInfo.id === team.creator) || (userInfo && userInfo.role.includes('admin'))) && (
                            <div className="flex mt-4">
                            <Link to={`/teams/${team.id}/edit`} className="btn btn-outline btn-primary mr-3">Edit</Link>
                            <DeleteBtn setError={setError} id={team.id} resource="teams" deleteCallback={() => navigate('/')} />
                            <MatchBtn id={team.id} users={teamUserList} size={team.size} setError={setError} />
                            </div>
                        )}
                        </div>
                </div>
            </div>
                    <div className="text-3xl font-bold text-center my-4">Users in Team:</div>
                    <hr className="my-4" />
                    <div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-6 justify-items-center m-3'>
                        {userList}
                    </div>
                    {authenticated && ((userInfo && userInfo.id === team.creator) || (userInfo && userInfo.role.includes('admin'))) && (
                        
                        <>
                        <div className="text-3xl font-bold text-center my-4">Sent Requests To:</div>
                        
                            <hr className="my-4" />
                                <div  div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-6 justify-items-center m-3'>
                                {sentUsers}
                                </div>
                            {friendList.length > 0 ? (
                                <>
                                    <div className="text-3xl font-bold text-center my-4 ">Add Friends To Team:</div>
                                    <hr className="my-4" />
                                    <div className='grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 sm:grid-cols-1 gap-6 justify-items-center m-3'>
                                        {friendList}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center my-4">
                                <Link to="/social"> <button className="btn btn-primary">Add Friends</button></Link> 
                                </div>
                            )}
                        </>
                    )}
                </div>
            );

    
} 

export default Show;