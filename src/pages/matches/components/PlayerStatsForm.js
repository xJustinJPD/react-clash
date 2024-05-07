import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContexts';
import axios from '../../../config/Api';
import { useState } from 'react';

const PlayerCard = ({user}) => {
    const [isLoading, setIsLoading] = useState(false);
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

    console.log(`submitted user ${user.id} + ${user.user.id}`)

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

    const onSubmit = () => {
        setIsLoading(true)
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
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };


	return (
        
            <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-white">{user.user.username}</h2>
                    <h2 className='m-3'>Update Stats:</h2>
                        <form onSubmit={submitForm}>
                        <div className='m-3'>
                        <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-white">Kills:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.kills} name='kills' placeholder="Type here" className="input input-bordered w-full max-w-xs text-black" />
                        </label>
                        </div>
                        <div className='m-3'>
                        <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text text-white">Deaths:</span>
                        </div>
                        <input type="text" onChange={handleForm} value={form.deaths} name='deaths' placeholder="Type here" className="input input-bordered w-full max-w-xs text-black" />
                        </label>
                        </div>
                        <button type='submit' onClick={onSubmit} className="btn btn-outline btn-success">
                            {isLoading ? "Submitted" : "Submit"}
                        </button>
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