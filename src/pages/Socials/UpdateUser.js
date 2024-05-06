import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/Api';
import { useAuth } from "../../contexts/AuthContexts"; 
const EditUser = () => {
    const { id } = useParams();
    const [local] = axios;
    const { authenticated, userInfo } = useAuth();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        username: "",
        description:"",
        email: ""
    });

    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        local.get(`/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setUser(response.data.data);
            setForm(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setForm(prevState => ({
            ...prevState,
            imageFile: file
        }));
    };

    const isRequired = (fields) => {
        let included = true;
        setErrors({});
        fields.forEach(field => {
            if(!form[field]){
                included = false;
                setErrors(prevState => ({
                    ...prevState,
                    [field]: true
                }));
            }
        });
        return included;
    };
    

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const submitForm = (e) => {
        e.preventDefault();

        if(!isValidEmail(form.email)){
            setErrors(prevState => ({
                ...prevState,
                email: 'Invalid email address!'
            }));
            return;
        }

        if(isRequired(['username'])){
            let formData = new FormData();
            formData.append('username', form.username);
            formData.append('description', form.description);
            formData.append('email', form.email);
            formData.append('imageFile', form.imageFile);
            formData.append('_method', 'put');        

            local.post(`/user/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                navigate('/profile');
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.errors) {
                    const { errors } = err.response.data;
                    setErrors({
                        username: errors.username || "",
                        description: errors.description || "",
                        email: errors.email || ""
                    });
                }
            });
        }
    };
    if (authenticated && userInfo && userInfo.id !== parseInt(id)) {
        navigate('/pageNotFound');
    }
    return (
        <div>
            <h2 className='m-3'>Edit User</h2>
            <form onSubmit={submitForm}>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Username:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.username} name='username' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.username}</span>
                    </label>
                </div>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Description:</span>
                        </div>
                        <input 
                            type="text" 
                            onChange={handleForm} 
                            value={form.description} 
                            name='description' 
                            placeholder="Type here"  
                            className="input input-bordered large-input" 
                        />
                        <span style={errorStyle}>{errors.description}</span>
                    </label>
                </div>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Email:</span>
                        </div>
                        <input 
                            type="text" 
                            onChange={handleForm} 
                            value={form.email} 
                            name='email' 
                            placeholder="Type here"  
                            className="input input-bordered" 
                        />
                        <span style={errorStyle}>{errors.email}</span>
                    </label>
                </div>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">User Image</span>
                        </div>
                        <input type="file"  onChange={handleImageChange} name='image' className="file-input file-input-bordered w-full max-w-xs" />
                    </label>
                </div>

                <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default EditUser;
