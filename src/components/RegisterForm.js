import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const RegisterForm = () => {
    const { onAuthenticated } = useAuth();

    const navigate = useNavigate();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleClick = () => {
        console.log("clicked", form);

        axios.post('https://college-api.vercel.app/api/register', {
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then(response => {
            console.log(response.data);
            onAuthenticated(true, response.data.token);
            navigate('/')
        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
            setErrorMessage(Object.values(err.response.data));
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
            {/* <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className="py-6">or <b><Link to={`/login`}>Login</Link></b></p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form className="card-body">
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input onChange={handleForm} type="text" name="name" value={form.name} />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input onChange={handleForm} type="text" name="email" value={form.email} />
                        </div>
                        <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input onChange={handleForm} type="password" name="password" value={form.password}/>

                        </div>
                        <div className="form-control mt-6">
                        <button onClick={handleClick} className="btn btn-success">Register</button>
                        </div>
                    </form>
                    <p style={errorStyle}>{errorMessage}</p>
                    </div>
                </div>
            </div> */}

            <div className='grid grid-cols-1 gap-1 justify-items-center m-3'>
            <h2 className='m-3'><b>Register:</b></h2>
            Name: <input onChange={handleForm} type="text" name="name" value={form.name}  /> <br />
            Email: <input onChange={handleForm} type="text" name="email" value={form.email}  /> <br />
            Password: <input onChange={handleForm} type="password" name="password" value={form.password} />
            <p className="py-6">or <b><Link to={`/login`}>Login</Link></b></p>

            <button className='btn btn-success w-20' onClick={handleClick}>Register</button>
            <p style={errorStyle}>{errorMessage}</p>
            </div>

        </>
    );
};

export default RegisterForm;