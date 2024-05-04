import { Link } from 'react-router-dom';

const UserHero = ({ user }) => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={user.image} className="max-w-sm rounded-lg shadow-2xl" />
                <div>
                    <h1 className="text-5xl font-bold mb-3">{user.username}</h1>
                    {user.description && <p className="">{user.description}</p>}
                    <p className=""><b>Kills: </b>{user.kills}</p>
                    <p className=""><b>Deaths: </b>{user.deaths}</p>
                    <p className=""><b>Rank: </b>{user?.rank}</p>
                    <p className=""><b>KD Ratio: </b>{user['user-kd-ratio']}</p>
                    <p className=""><b>Win/loss Ratio: </b>{user['user-win-ratio']}</p>
                    </div>
                    <h2>Teams:</h2>
                    <div className="carousel w-full">
                        {user.teams && user.teams.map(team => (
                            <div key={team.id} className="carousel-item w-full">
                                <Link to={`/teams/${team.id}`}>
                                    <img src={team.image} className="justify-center rounded-full w-20 h-20" alt={team.name} />
                                    <p className="text-center">{team.name}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center w-full py-2 gap-2">
                        {/* Pagination buttons */}
                    </div>
                </div>
           
        </div>
    );
}

export default UserHero;
