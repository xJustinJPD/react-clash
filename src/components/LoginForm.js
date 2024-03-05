import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContexts';
import { Link,useNavigate } from 'react-router-dom';


const LoginForm = () => {
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
        console.log("clicked", form);
        let regToken = localStorage.getItem('token');

        axios.post('http://localhost/api/auth/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data);
            const { token, id, role } = response.data;
            onAuthenticated(true, token, id, role);
            navigate('/teams');
        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
        });
    }        
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
            Email: <input onChange={handleForm} type="text" className='border' name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} className='border'  type="password" name="password" value={form.password} />
            <p className="py-6">or <b><Link to={`/register`}>Register</Link></b></p>

            <button className='btn btn-primary w-20' onClick={handleClick}>Login</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>
        </>
    );
};

export default LoginForm;