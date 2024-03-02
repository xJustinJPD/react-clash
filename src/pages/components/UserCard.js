import { Link } from 'react-router-dom'
import FriendBtn from '../../components/Friend';
import { useNavigate } from 'react-router-dom';

const UserCard = ({user}) => {

    const navigate = useNavigate();

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username} </h2>
                    <b>ID: </b><p>{user.id}</p> 
                    <div className="card-actions justify-end">
                    {/* <Link to={`/users/${user.id}`}><button className="btn btn-outline btn-primary">More</button></Link> */}
                    <FriendBtn className="m-3" id={user.id} resource="teams" deleteCallback={() => navigate('/social')} />
                    </div>
            </div>
            </div>
        </>
        )
};

export default UserCard;