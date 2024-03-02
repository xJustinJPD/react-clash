import { Link } from 'react-router-dom'

const TeamCard = ({team}) => {

	return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{team.name} </h2>
                    <p><b>Size: </b>{team.size} / <b>ID: </b>{team.id}</p> 
                    <div className="card-actions justify-end">
                    <Link to={`/teams/${team.id}`}><button className="btn btn-outline btn-primary">More</button></Link>
                    </div>
    </div>
    </div>
        </>
        )
};

export default TeamCard;