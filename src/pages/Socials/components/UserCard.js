import { Link, useLocation } from 'react-router-dom'
import FriendBtn from './Friend';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContexts';
import axios from '../../../config/Api';
const UserCard = ({user, setError }) => {
    const { userInfo } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [local] = axios; 
    const [sentRequests, setSentRequests] = useState([]);
    useEffect(() => {
        local.get('/requests/sent', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setSentRequests(response.data.requests);
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        });
    }, [local, token]);
    const isFriendRequested = sentRequests.some(request => request.friend_id === user.id);
    const isSpecificPage = location.pathname.startsWith('/teams/');
	return (
        <>         
            <Link to={`/user/${user.id}`}>
            <div className="card card-side w-96 bg-neutral text-neutral-content">
                <figure className='justify-center ml-10'>
                <img src={user?.image} alt="" className="justify-center rounded-full w-20 h-20" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username}</h2>
                    {userInfo && userInfo.id !== user.id && !isSpecificPage && (
                            <FriendBtn className="m-3" id={user.id} resource="teams" disabled={isFriendRequested} setError={setError} deleteCallback={() => navigate('/social')} />
                        )}
                </div>
            </div>
            </Link>
            </>

        
    );
};

export default UserCard;