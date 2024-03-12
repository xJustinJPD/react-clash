import { useEffect, useState } from "react";
import axios from '../config/Api';
import TeamCard from "./components/TeamCard";
import MatchBtn from "../matches/Create";

const Teams = () => {
    const [teams, setTeamList] = useState([]);
    
    let token = localStorage.getItem('token');

    useEffect(() => {
        axios.get("/user-teams", {
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
        <>  
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {teamList}
            </div>
        </>
    );
};

export default Teams;
