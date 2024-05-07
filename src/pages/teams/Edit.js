import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/Api';
import { useAuth } from "../../contexts/AuthContexts";

const Edit = () => {
    const { id } = useParams();
    const [local] = axios;
    const { authenticated, userInfo } = useAuth();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        name: "",
        size: ""
    });

    const errorStyle = {
        color: 'red'
    };

    let token = localStorage.getItem('token');
    
    useEffect(() => {
        local.get(`/teams/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data);
            setTeam(response.data.data);
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
                    [field]: `${field} is required!`
                }));
            }
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();

        if(isRequired(['size'])){
            let formData = new FormData();
           
            formData.append('name', form.name);
            formData.append('size', form.size);
            formData.append('imageFile', form.imageFile);
            formData.append('_method', 'put');

            if (userInfo && userInfo.role.includes('admin')) {
                formData.append('wins', form.wins);
                formData.append('losses', form.losses);
            }

            local.post(`/teams/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
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
                        wins: errors.wins || "",
                        losses: errors.losses || "",
                        imageFile: errors.imageFile || ""
                    });
                }
            });
        } 
    };
 
    return (
        <div className='grid grid-cols-1 gap-1 justify-items-center m-10 pb-36'>
            <h1 className='m-3 font-bold text-2xl'>Edit Team</h1>
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

                {authenticated && (userInfo && userInfo.role.includes('admin')) && ( 
                    <>
                        <div className='m-3'>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Wins:</span>
                                </div>
                                <input type="number" onChange={handleForm} value={form.wins} name='wins' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                <span style={errorStyle}>{errors.wins}</span>
                            </label>
                        </div>
                        <div className='m-3'>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Losses:</span>
                                </div>
                                <input type="number" onChange={handleForm} value={form.losses} name='losses' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                                <span style={errorStyle}>{errors.losses}</span>
                            </label>
                        </div>
                    </>
                )}

                <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Team Image</span>
                        </div>
                        <input type="file" onChange={handleImageChange} name='image' className="file-input file-input-bordered w-full max-w-xs" />
                        <span style={errorStyle}>{errors.imageFile}</span>
                    </label>
                </div>

                <div className='flex justify-center p-5'>
            <button type='submit' className="btn btn-wide btn-info">
                        Complete
                        </button>
            </div>
            </form>
        </div>
    );
};

export default Edit;
