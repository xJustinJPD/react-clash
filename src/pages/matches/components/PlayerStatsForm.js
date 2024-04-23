import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContexts';
import axios from '../../../config/Api';
import { useState } from 'react';

const PlayerCard = ({user}) => {
    const { userInfo } = useAuth();
    const navigate = useNavigate();
    const [local] = axios;
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        kills: "",
        deaths: ""
    });

    const handleForm = (e) => {
        setForm(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
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

        if(isRequired(['kills', 'deaths'])){
            // //created a new form data object
            // let formData = new FormData();
            // //append adds the new data to the associated values
            // formData.append('kills', form.kills);
            // formData.append('deaths', form.deaths);


            local.put(`/stats/${user.id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    //to allow files to the form
                }
            })
            .then(response => {
                console.log({form})
                console.log(`submitted user ${user.id}`)
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

	return (
        
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user.username}</h2>
                    <h2 className='m-3'>Update K/D</h2>
                        <form onSubmit={submitForm}>
                        <div className='m-3'>
                        <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Kills:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.kills} name='kills' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        </div>
                        <div className='m-3'>
                        <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text">Deaths:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.deaths} name='deaths' placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </label>
                        </div>
                        <input type='submit' className="btn btn-success m-3" />
                        </form>
                    <div className="card-actions justify-end">
                        {userInfo && userInfo.id !== user.id && (
                            <>

                            </>
                        )}
                    </div>
                </div>
            </div>
        
    );
};

export default PlayerCard;