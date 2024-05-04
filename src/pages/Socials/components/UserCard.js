import { Link } from 'react-router-dom'
import FriendBtn from './Friend';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContexts';
const UserCard = ({user}) => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();

	return (
        <>         
        {/* <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username}</h2>
                    <b>ID: </b><p>{user.id}</p>
                    <div className="card-actions justify-end">
                        {userInfo && userInfo.id !== user.id && (
                            <>
                                <FriendBtn className="m-3" id={user.id} resource="teams" deleteCallback={() => navigate('/social')} />
                                <Link to={`/user/${user.id}`}><button className="btn btn-primary">More info</button></Link>
                            </>
                        )}
                    </div>
                </div>
            </div> */}
            <Link to={`/user/${user.id}`}>
            <div className="card card-side w-96 bg-neutral text-neutral-content">
                <figure className='justify-center ml-10'>
                <img src={user?.image} alt="" className="justify-center rounded-full w-20 h-20" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username}</h2>
                    {/* <img src={`${pic}/${team?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" /> */}
                    {userInfo && userInfo.id !== user.id && (
                            <>
                                <FriendBtn className="m-3" id={user.id} resource="teams" deleteCallback={() => navigate('/social')} />
                            </>
                        )}
                </div>
            </div>
            </Link>
            </>

        
    );
};

export default UserCard;