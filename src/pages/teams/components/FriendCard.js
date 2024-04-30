import { Link } from 'react-router-dom'
import AddBtn from './FriendTeam';

const Friend = ({friend, team_id, addCallback, setError}) => {

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{friend.username} </h2>
                    <b>ID: </b><p>{friend.id}</p> 
                    <div className="card-actions justify-end">
                    {/* <Link to={`/teams/${friend.id}`}><button className="btn btn-outline btn-primary">More</button></Link> */}
                    <AddBtn className="m-3" team_id={team_id} player_username={friend.username} addCallback={addCallback} setError={setError}  />
                    </div>
            </div>
            </div>
        </>
        )
};

export default Friend;