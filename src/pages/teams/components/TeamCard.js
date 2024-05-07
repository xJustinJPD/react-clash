import { Link } from 'react-router-dom';

const TeamCard = ({ team }) => {
    
    // console.log(team.image, "all")

    return (
        <>
        <Link to={`/teams/${team.id}`}>
            <div className="card card-side w-96 bg-neutral text-neutral-content">
                <figure className='justify-center ml-10'>
                <img src={team?.image} alt=""  className="justify-center rounded-full w-20 h-20" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{team.name} </h2>
                    {/* <img src={`${pic}/${team?.image}`} alt="" className="mb-4 rounded-full w-24 h-24" /> */}
                    <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mx-1 w-4 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p>{team.size}</p> 
                    </div>
                </div>
            </div>
            </Link>
        </>
    );
};

export default TeamCard;
