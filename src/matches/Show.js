import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';


const MatchShow = () => {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            Match
            </div>
        </>
    );
};

export default MatchShow;