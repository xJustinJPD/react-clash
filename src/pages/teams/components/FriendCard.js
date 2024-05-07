import { Link } from 'react-router-dom'
import AddBtn from './FriendTeam';

const Friend = ({friend, team_id, addCallback, setError}) => {

	return (
            <>
            <Link to={`/user/${friend.id}`}>
            <div className="card card-side w-96 bg-neutral text-neutral-content">
                <figure className='justify-center ml-10'>
                <img src={friend?.image} alt="" className="justify-center rounded-full w-20 h-20" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{friend.username}</h2>
                    <AddBtn className="m-3" team_id={team_id} player_username={friend.username} addCallback={addCallback} setError={setError}  />
                </div>
            </div>
            </Link>
        </>
        )
};

export default Friend;