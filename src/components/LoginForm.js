import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const { onAuthenticated } = useAuth();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        name : "",
        username : "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        console.log("clicked", form);
        let regToken = "2|ChGR6A5pk5h3dTS6PVovZELwOoLGlSZpfSMZMfNY503c6281"

        axios.post('http://localhost/api/auth/login', {
            headers: {
                'Authorization': `Bearer ${regToken}`
            },
            name: form.name,
            username : form.username,
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data);
            onAuthenticated(true, response.data.token);
        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
        });
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
            Name: <input onChange={handleForm} type="text" name="name" value={form.name}  /> <br />
            Username: <input onChange={handleForm} type="text" name="username" value={form.username}  /> <br />
            Email: <input onChange={handleForm} type="text" name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />
            <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p>

            <button className='btn btn-primary w-20' onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default LoginForm;