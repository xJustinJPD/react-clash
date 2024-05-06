import axios from '../config/Api';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const RegisterForm = () => {
    const { onAuthenticated } = useAuth();
    const [local] = axios;
    const navigate = useNavigate();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        username : "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleClick = (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setErrorMessages(prevState => ({
                ...prevState,
                confirmPassword: "Passwords do not match"
            }));
            return;
        }

        local.post('/auth/register', {
            username: form.username,
            email: form.email,
            password: form.password
        })
        .then(response => {
            const { token, id, role } = response.data;
            onAuthenticated(true, token, id, role)
            navigate('/teams')
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.errors) {
                const { errors } = err.response.data;
                setErrorMessages({
                    username: errors.username || "",
                    email: errors.email || "",
                    password: errors.password || "",
                    confirmPassword: ""
                });
            }
        });
    };

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick(e);
        }
    };

    return (
        <>
            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Register:</b></h2>
            Username: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="text" name="username" value={form.username}  />
            <p style={errorStyle}>{errorMessages.username}</p> <br />
            Email: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="text" name="email" value={form.email}  /> 
            <p style={errorStyle}>{errorMessages.email}</p> <br />
            Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="password" name="password" value={form.password} />
            <p style={errorStyle}>{errorMessages.password}</p> <br />
            Confirm Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="password" name="confirmPassword" value={form.confirmPassword} />
            <p style={errorStyle}>{errorMessages.confirmPassword}</p> <br />
            <p className="py-6">or <b><Link to={`/login`}>Login</Link></b></p>

            <button className='btn btn-success w-20' onClick={handleClick}>Submit</button>
            </div>
        </>
    );
};

export default RegisterForm;
