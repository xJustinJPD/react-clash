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
        size: "",
        image: ""
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
                    [field]: {
                        message: `${field} is required!`
                    }
                }));
            }
            
        });

        return included;
    };

    const submitForm = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        // console.log(token);
        console.log('submitted', form);

        if(isRequired(['name', 'size'])){
            //created a new form data object
            let formData = new FormData();
            //append adds the new data to the associated values
            formData.append('name', form.name);
            formData.append('size', form.size);
            formData.append('imageFile', form.imageFile);
            formData.append('_method', 'put');
            if (userInfo && userInfo.role.includes('admin')) {
                // Append wins and losses only if user is admin
                formData.append('wins', form.wins);
                formData.append('losses', form.losses);
            }


            local.post(`/teams/${id}`, formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //to allow files to the form
                    "Content-Type": "multipart/form-data",
                }
            })
            .then(response => {
                navigate('/teams');
                console.log({form})
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };
 
    return (
        <div>
            <h2 className='m-3'>Edit Team</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Name:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.name} name='name' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.name?.message}</span>
            </label>
            </div>

            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Size:</span>
            </div>
            <input type="number" onChange={handleForm} value={form.size} name='size' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.size?.message}</span>
            </label>
            </div>
            {authenticated && (userInfo && userInfo.role.includes('admin')) && ( 
                <>
                  <div className='m-3'>
                  <label className="form-control w-full max-w-xs">
                  <div className="label">
                      <span className="label-text">Wins:</span>
                  </div>
                  <input type="number" onChange={handleForm} value={form.wins} name='wins' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.wins?.message}</span>
                  </label>
                  </div>
                    <div className='m-3'>
                    <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Losses:</span>
                    </div>
                    <input type="number" onChange={handleForm} value={form.losses} name='losses' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.losses?.message}</span>
                    </label>
                    </div>
                    </>
            )}
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">Team Image</span>
            <span className="label-text-alt">Image</span>
            </div>
            <input type="file"  onChange={handleImageChange} name='image' className="file-input file-input-bordered w-full max-w-xs" />
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};


export default Edit;