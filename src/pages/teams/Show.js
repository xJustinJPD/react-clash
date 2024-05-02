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
            <Friend key={friend.id} friend={friend.friend} team_id={team.id} addCallback={fetchSentRequests} />
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
        <>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                <img src={team?.image} alt="" className="mb-4 rounded-full w-24 h-24" />
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">{team.name}</h1>
                        <p className="py-6">{team.size} Size</p>
                        <p className="py-6">Level {team.wins}</p>
                        <p className="py-6">{team.losses}</p>
                    </div>
                    
                    {authenticated && ((userInfo && userInfo.id === team.creator) || (userInfo && userInfo.role.includes('admin'))) && (
                        <>
                            <Link to={`/teams/${team.id}/edit`}><button className="btn btn-outline btn-primary m-3">Edit</button></Link>
                            <DeleteBtn className="m-3"  setError={setError} id={team.id} resource="teams" deleteCallback={() => navigate('/')} />
                            <MatchBtn id={team.id} users={teamUserList} size={team.size} setError={setError}/>
                        </>
                    )}
                </div>
            </div>
            <div className="text-3xl font-bold text-center my-4">Users in Team:</div>
            <hr className="my-4" />
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {userList}
            </div>
            {authenticated && ((userInfo && userInfo.id === team.creator) || (userInfo && userInfo.role.includes('admin'))) && (
                
                <>
                 <div className="text-3xl font-bold text-center my-4">Sent Requests To:</div>
                 
                    <hr className="my-4" />
                        <div  div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                        {sentUsers}
                        </div>
                    {friendList.length > 0 ? (
                        <>
                            <div className="text-3xl font-bold text-center my-4">Add Friends To Team:</div>
                            <hr className="my-4" />
                            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
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
        </>
    );

    
} 

export default Show;
