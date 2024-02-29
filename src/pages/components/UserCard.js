import { Link } from 'react-router-dom'

const UserCard = ({user}) => {

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.name} </h2>
                    <b>ID: </b><p>{user.id}</p> 
                    <div className="card-actions justify-end">
                    <Link to={`/users/${user.id}`}><button className="btn btn-outline btn-primary">More</button></Link>
                    </div>
            </div>
            </div>
        </>
        )
};

export default UserCard;