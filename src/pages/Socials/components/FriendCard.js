import { Link } from 'react-router-dom'

const FriendCard = ({friend}) => {

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{friend.username} </h2>
                    <b>ID: </b><p>{friend.id}</p> 
                    <div className="card-actions justify-end">
                    <Link to={`/user/${friend.id}`}><button className="btn btn-primary">More info</button></Link>
                    
                    </div>
            </div>
            </div>
        </>
        )
};

export default FriendCard;