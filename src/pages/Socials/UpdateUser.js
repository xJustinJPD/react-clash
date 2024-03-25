import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/Api';

const EditUser = () => {
    const { id } = useParams();
    const [local] = axios;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        username: "",
        image: ""
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
            console.log(response.data.data);
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

        if(isRequired(['username'])){
            //created a new form data object
            let formData = new FormData();
            //append adds the new data to the associated values
            formData.append('username', form.username);
            formData.append('image', form.image);
            formData.append('_method', 'put');


            local.post(`/user/${id}`, formData, {
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
            <h2 className='m-3'>Edit User</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Username:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.username} name='username' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.username?.message}</span>
            </label>
            </div>
            
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">User Image</span>
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


export default EditUser;