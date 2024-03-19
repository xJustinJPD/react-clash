import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from '../../config/Api';
import TeamCard from "./components/TeamCard";
import MatchBtn from "../matches/Create";

const Teams = () => {
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
            console.error(err);
        });
    }, []);

    const teamList = teams.map((team, i) => (
        <TeamCard key={team.id} team={team} />
    ));

    return (
        <div>  
            <div className="grid mt-3 justify-items-center">
            <Link to="/teams/create"><button className="px-4 py-2 bg-green-500 rounded text-white ml-2">
            Create Team
            </button></Link>
            </div>
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {teamList}
            </div>
        </div>
    );
};

export default Teams;
