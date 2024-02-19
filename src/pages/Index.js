import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContexts";
import TeamCard from "./components/TeamCard";

const Index = () => {
    const { authenticated } = useAuth();
    const [term, setTerm] = useState("");
    const [teams, setTeamList] = useState([])
    
    // let token = localStorage.getItem('token');
    let token = "3|SX14PGkoOVKjC9cgJM9mFg0eqUMxfI3zZztHxywH9d1eea59"

    useEffect(()=>{
        axios.get("http://localhost/api/teams",{
            headers: {
                'Authorization' :  `Bearer ${token}`
            }
        })
        .then(response => {
            setTeamList(response.data.data)
            console.log(response)
        })
        .catch(err => {
            console.error(err)
        })
    })

    const teamList = teams.map((team, i) => {
        return <TeamCard key={team.id} team={team}/>
    })

    return (
        <>
        <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
        {teamList}
        </div>
        </>
    );
};

export default Index;