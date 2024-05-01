import { useNavigate, Link } from 'react-router-dom';
import axios from '../../config/Api';
import { useState } from 'react';


const CreateAdminUser = () => {
    const [local] = axios;
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        username : "",
        email: "",
        password: ""
    });

    const [errorMessages, setErrorMessages] = useState({
        username: "",
        email: "",
        password: ""
    });

    const handleClick = (e) => {
        let token = localStorage.getItem('token');
        // console.log("clicked", form);
        e.preventDefault();
        local.post('/user/adminCreate', {
            username: form.username,
            email: form.email,
            password: form.password
        }, {  // Add a comma here
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            alert('New admin created. Redirecting to social.');
            navigate('/social');
        })
        .catch(err => {
            console.error(err);
            if (err.response && err.response.data && err.response.data.errors) {
                const { errors } = err.response.data;
                setErrorMessages({
                    username: errors.username || "",
                    email: errors.email || "",
                    password: errors.password || ""
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
            <h2 className='m-3'><b>Create New Admin:</b></h2>
            Username: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="text" name="username" value={form.username}  />
            <p style={errorStyle}>{errorMessages.username}</p> <br />
            Email: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="text" name="email" value={form.email}  /> 
            <p style={errorStyle}>{errorMessages.email}</p> <br />
            Password: <input onChange={handleForm} onKeyDown={handleKeyDown} className='border' type="password" name="password" value={form.password} />
            <p style={errorStyle}>{errorMessages.password}</p> <br />

            <button className='btn btn-success w-20' onClick={handleClick}>Submit</button>
            </div>

        </>
    );
};

export default CreateAdminUser;