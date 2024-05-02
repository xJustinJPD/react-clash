import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from '../../config/Api';
import TeamCard from "./components/TeamCard";
import MatchBtn from "../matches/Create";

const Teams = ({ setError }) => {
    const [teams, setTeamList] = useState([]);
    const [local] = axios;
    let token = localStorage.getItem('token');

    useEffect(() => {
        local.get("/user-teams", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTeamList(response.data.data);
            console.log(response);
        })
        .catch(err => {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message); 
            }
        });
    }, []);

    const teamList = teams.map((team, i) => (
        <TeamCard key={team.id} team={team} />
    ));

    return (
        <div>  
            <div className="grid mt-3 ml-3 mr-10 pr-6 justify-end">
            <Link to="/teams/create"><button className="btn btn-outline btn-primary rounded text-white">
            New Team +
            </button></Link>
            </div>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {teamList}
            </div>
        </div>
    );
};

export default Teams;
