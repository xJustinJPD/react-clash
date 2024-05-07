import { useState } from 'react';
import axios from '../../../config/Api';
import { useAuth } from '../../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const UpdateGameForm = ({ gameId, team1Creator, team2Creator, team1id, team2id }) => {
    const navigate = useNavigate();
    const [local] = axios;
    const [team1Score, setTeam1Score] = useState('');
    const [team2Score, setTeam2Score] = useState('');
    const [team1Result, setTeam1Result] = useState('');
    const [team2Result, setTeam2Result] = useState('');
    const [team1Image, setTeam1Image] = useState(null);
    const [team2Image, setTeam2Image] = useState(null);
    const { authenticated, userInfo } = useAuth();

    const handleTeam1ImageChange = (e) => {
        const file = e.target.files[0];
        setTeam1Image(file);
    };

    const handleTeam2ImageChange = (e) => {
        const file = e.target.files[0];
        setTeam2Image(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
         
            const formData = new FormData();
            if (authenticated && (userInfo && (userInfo.id === team1Creator || userInfo.role.includes('admin')))) {
                formData.append('team_1_score', parseInt(team1Score));
                formData.append('team_1_result', JSON.parse(team1Result));
                formData.append('team_1_image', team1Image); 
            }
            if (authenticated && (userInfo && (userInfo.id === team2Creator || userInfo.role.includes('admin')))) {
                formData.append('team_2_image', team2Image); 
                formData.append('team_2_result', JSON.parse(team2Result));
                formData.append('team_2_score', parseInt(team2Score));
            }
            
            formData.append('_method', 'put');
            console.log('Form data:', formData);
            const response = await local.post(`/games/${gameId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data"
                }
            });

            console.log(response.data);
            navigate(`/match/${gameId}/${team1id}/${team2id}/stats`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {authenticated && (
                <>
                    {(userInfo && (userInfo.id === team1Creator || userInfo.role.includes('admin'))) && (
                        <div className="space-y-2">
                            <div className='p-5'>
                            <label htmlFor="team1Score">Team 1 Score:</label>
                            <input type="number" className='outline m-2' id="team1Score" value={team1Score} onChange={(e) => setTeam1Score(e.target.value)} />
                            <br/>
                            </div>
                            <div className='p-5'>
                            <label htmlFor="team2Score">Team 1 Result Image:</label>
                            <input type="file" onChange={handleTeam1ImageChange} name='team_1_image' className="file-input file-input-bordered w-full max-w-xs" />
                            <br/>
                            </div>
                            <div className='p-5'>
                            <label htmlFor="team1Result">Team 1 Result:</label>
                            <select id="team1Result" className='outline m-2' value={team1Result} onChange={(e) => setTeam1Result(e.target.value)}>
                                <option value="">Select Result</option>
                                <option value={0}>Win</option>
                                <option value={1}>Loss</option>
                            </select>
                            </div>
                        </div>
                    )}
                    
                    {(userInfo && (userInfo.id === team2Creator || userInfo.role.includes('admin'))) && (
                        <div className="space-y-2">
                            <div className='p-5'>
                            <label htmlFor="team2Score">Team 2 Score:</label>
                            <input className='outline m-2' type="number" id="team2Score" value={team2Score} onChange={(e) => setTeam2Score(e.target.value)} />
                            <br/>
                            </div>
                            <div className='p-5'>
                            <label htmlFor="team2Score">Team 2 Result Image:</label>
                            <input type="file" onChange={handleTeam2ImageChange} name='team_2_image' className="file-input file-input-bordered w-full max-w-xs"/>
                            <br/>
                            </div>
                            <div className='p-5'>
                            <label htmlFor="team2Result">Team 2 Result:</label>
                            <select id="team2Result" className='outline m-2' value={team2Result} onChange={(e) => setTeam2Result(e.target.value)}>
                                <option value="">Select Result</option>
                                <option value={0}>Win</option>
                                <option value={1}>Loss</option>
                            </select>
                            </div>
                        </div>
                    )}
                </>
            )}
            <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Confirm Complete Game
            </button>
        </form>
    );
};

export default UpdateGameForm;
