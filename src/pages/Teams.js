import { useEffect, useState } from "react";
import axios from "axios";
import TeamCard from "./components/TeamCard";

const Teams = () => {
    const [teams, setTeamList] = useState([]);
    
    let token = "1|c36BbeRw54L1gqDeqTJXurJiRkihITCSkZ80VGabead3e464";

    useEffect(() => {
        axios.get("http://localhost/api/teams", {
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
            <h1>hello</h1>
        </>
    );
};

export default Teams;
