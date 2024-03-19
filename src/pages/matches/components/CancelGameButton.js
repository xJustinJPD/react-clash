import axios from '../../../config/Api';
import { useNavigate } from 'react-router-dom';

const CancelGameButton = ({ gameId }) => {
    const navigate = useNavigate();
    const [local] = axios;
    const handleCancelGame = async () => {
        try {
            const token = localStorage.getItem('token'); 
            
            await local.put(`/games/${gameId}/cancel`, null, {
                headers: {
                    Authorization: `Bearer ${token}` 
                }
            });
            navigate('/teams'); 
        } catch (error) {
            console.error('Error canceling game:', error);
        }
    };

    return (
        <button onClick={handleCancelGame} className="btn btn-danger">
            Cancel Game
        </button>
    );
};

export default CancelGameButton;
