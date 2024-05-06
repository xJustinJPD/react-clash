import axios from '../config/Api';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = () => {
    const [local] = axios;
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        let regToken = localStorage.getItem('token');

        local.post('/auth/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            const { token, id, role } = response.data;
            onAuthenticated(true, token, id, role);
            navigate('/teams');
        })
        .catch(err => {
            console.error(err);
            setErrorMessage(err.response.data.message);
        });
    }        

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Login:</b></h2>
            Email: <input onChange={handleForm} onKeyDown={handleKeyDown} type="text" className='border' name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border'  type="password" name="password" value={form.password} />
            <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p>

            <button className='btn btn-primary w-20' onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default LoginForm;

