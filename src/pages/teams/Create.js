import axios from '../../config/Api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [local] = axios;
    const navigate = useNavigate();
    const errorStyle = {
        color: 'red'
    };

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        image: ""
    });

    const [form, setForm] = useState({
        name: "",
        size: "",
        image: ""
    });

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
            image: file
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
                    [field]: `${field} is required!`
                }));
            }
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');

        if(isRequired(['name', 'size'])){
            let formData = new FormData();
            formData.append('name', form.name);
            formData.append('size', form.size);
            formData.append('image', form.image);

            local.post('/teams', formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                navigate('/teams');
            })
            .catch(err => {
                console.error(err);
                if (err.response && err.response.data && err.response.data.errors) {
                    const { errors } = err.response.data;
                    setErrors({
                        name: errors.name || "",
                        size: errors.size || "",
                        image: errors.image || ""
                    });
                }
            });
        } 
    };
    
    return (
        <div className='grid grid-cols-1 gap-1 justify-items-center m-10'>
            <h1 className='m-3 font-bold text-2xl'>Create Team</h1>
            <form onSubmit={submitForm}>
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Name:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.name} name='name' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <span style={errorStyle}>{errors.name}</span>
                    </label>
                </div>

                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Size:</span>
                        </div>
                        <select onChange={handleForm} value={form.size} name='size' className="select select-bordered w-full max-w-xs">
                            <option value="" disabled defaultValue>Select the size of your team</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <span style={errorStyle}>{errors.size}</span>
                    </label>
                </div>
                
                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Team Image</span>
                        </div>
                        <input type="file" onChange={handleImageChange} name='image' className="file-input file-input-bordered w-full max-w-xs" />
                        <span style={errorStyle}>{errors.image}</span>
                    </label>
                </div>
            <div className='flex justify-center p-5'>
            <button type='submit' className="btn btn-wide btn-success">
                        Create Team
                        </button>
            </div>
            </form>
            </div>
    );
};

export default Create;
