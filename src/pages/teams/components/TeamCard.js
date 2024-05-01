import { Link } from 'react-router-dom';
import axios from '../../../config/Api';

const TeamCard = ({ team }) => {
  const [local,picture] = axios
  console.log(team)

    return (
        <>
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                <img src={team?.image} alt="" className="mb-4 rounded-full w-24 h-24" />
                    <h2 className="card-title">{team.name} </h2>
                    {/* <img src={`${pic}/${team?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" /> */}
                    <p><b>Size: </b>{team.size} / <b>ID: </b>{team.id}</p> 
                    <div className="card-actions justify-end">
                        <Link to={`/teams/${team.id}`}><button className="btn btn-outline btn-primary">More</button></Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TeamCard;
