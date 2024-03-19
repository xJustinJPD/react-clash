import { useEffect, useState } from "react";
import axios from '../../config/Api';
import MatchCard from "./components/MatchCard";

const Matches = () => {
    const [matches, setMatchList] = useState([]);
    const [local] = axios;
    let token = localStorage.getItem('token');

    useEffect(() => {
        local.get("/games", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setMatchList(response.data.data);
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);

    const matchList = matches.map((match, i) => (
        <MatchCard key={match.id} match={match} />
    ));

    return (
        <>  
            <div className='grid grid-cols-3 gap-6 justify-items-center m-3'>
                {matchList}
            </div>
        </>
    );
};

export default Matches;
