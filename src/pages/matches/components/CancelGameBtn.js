import axios from '../../../config/Api';
import { useNavigate } from 'react-router-dom';

const CancelGameButton = ({ gameId, setError }) => {
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
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            }
        }
    };

    return (
        <button onClick={handleCancelGame} className="btn btn-danger">
            Cancel MatchMaking
        </button>
    );
};

export default CancelGameButton;
