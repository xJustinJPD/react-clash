import React, { useState } from 'react';
import axios from '../../../config/Api';
import { useAuth } from '../../../contexts/AuthContexts';
import { useNavigate } from 'react-router-dom';

const UpdateGameForm = ({ gameId, team1Creator, team2Creator }) => {
    const navigate = useNavigate();
    const [local] = axios;
    const [team1Score, setTeam1Score] = useState('');
    const [team2Score, setTeam2Score] = useState('');
    const [team1Result, setTeam1Result] = useState('');
    const [team2Result, setTeam2Result] = useState('');
    const { authenticated, userInfo } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const formData = new FormData();
            formData.append('team_1_score', team1Score);
            formData.append('team_2_score', team2Score);
            formData.append('team_1_result', team1Result);
            formData.append('team_2_result', team2Result);

            const response = await local.put(`/games/${gameId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            console.log(response.data);
            navigate(`/teams`);
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
                            <label htmlFor="team1Score">Team 1 Score:</label>
                            <input type="number" id="team1Score" value={team1Score} onChange={(e) => setTeam1Score(e.target.value)} />
                            
                            <label htmlFor="team1Result">Team 1 Result:</label>
                            <select id="team1Result" value={team1Result} onChange={(e) => setTeam1Result(e.target.value)}>
                                <option value="">Select Result</option>
                                <option value="true">Win</option>
                                <option value="false">Loss</option>
                            </select>
                        </div>
                    )}
                    
                    {(userInfo && (userInfo.id === team2Creator || userInfo.role.includes('admin'))) && (
                        <div className="space-y-2">
                            <label htmlFor="team2Score">Team 2 Score:</label>
                            <input type="number" id="team2Score" value={team2Score} onChange={(e) => setTeam2Score(e.target.value)} />
                            
                            <label htmlFor="team2Result">Team 2 Result:</label>
                            <select id="team2Result" value={team2Result} onChange={(e) => setTeam2Result(e.target.value)}>
                                <option value="">Select Result</option>
                                <option value="true">Win</option>
                                <option value="false">Loss</option>
                            </select>
                        </div>
                    )}
                </>
            )}
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Game
            </button>
        </form>
    );
};

export default UpdateGameForm;
