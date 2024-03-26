import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContexts';

const PlayerCard = ({user}) => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();

	return (
        
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username}</h2>
                    <b>ID: </b><p>{user.id}</p>
                    <div className="card-actions justify-end">
                        {userInfo && userInfo.id !== user.id && (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        
    );
};

export default PlayerCard;