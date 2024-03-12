import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const errorStyle = {
        color: 'red'
    };
   
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [form, setForm] = useState({
        username: "",
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
        // console.log('submitted', form);

        if(isRequired(['name', 'size'])){
            //created a new form data object
            let formData = new FormData();
            //append adds the new data to the associated values
            formData.append('name', form.username);

            axios.post(`http://localhost/api/teams/${id}/invite-user`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //to allow files to the form
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(response => {
                navigate('/');
                console.log('posted')
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    return (
        <div>
            <h2 className='m-3'>Add Users To Team</h2>
            <form onSubmit={submitForm}>
            <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
                <span className="label-text">Users:</span>
            </div>
            <input type="text" onChange={handleForm} value={form.name} name='name' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.name?.message}</span>
            
            </label>
            </div>

            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default Add;