import { useState } from 'react';
import axios from '../../../config/Api';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthContexts"; 
const UpdatePassword = () => {
    const { id } = useParams();
    const [local] = axios;
    const { authenticated, userInfo } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const errorStyle = { color: 'red' };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        const token = localStorage.getItem('token');

        local.put(`/user/${id}/update-password`, { password }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setError('');
            navigate('/profile');
        })
        .catch(error => {
            setError(error.response.data.message);
        });
    };
    
    if (authenticated && userInfo && userInfo.id !== parseInt(id)) {
        navigate('/pageNotFound');
    }
    return (
        <div>
            <h2 className='m-3'>Update Password</h2>
            <form onSubmit={handleSubmit}>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">New Password:</span>
                        </div>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={handlePasswordChange} 
                            placeholder="Type here"  
                            className="input input-bordered" 
                        />
                    </label>
                </div>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Confirm Password:</span>
                        </div>
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={handleConfirmPasswordChange} 
                            placeholder="Type here"  
                            className="input input-bordered" 
                        />
                        {error && <span style={errorStyle}>{error}</span>}
                    </label>
                </div>
                <input type='submit' className="btn btn-success m-3" value="Update Password" />
            </form>
        </div>
    );
};

export default UpdatePassword;
