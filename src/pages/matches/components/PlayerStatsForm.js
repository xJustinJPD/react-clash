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
    const [newKills, setNewKills] = useState(0);
    const [newDeaths, setNewDeaths] = useState(0);

    let kills;
    let deaths;

    const [form, setForm] = useState({
        kills: kills,
        deaths: deaths,
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

        kills = form.kills + newKills
        deaths = form.deaths + newDeaths

        if(isRequired(['kills', 'deaths'])){
            //created a new form data object
            let formData = new FormData();
            //append adds the new data to the associated values
            formData.append('kills', form.kills);
            formData.append('deaths', form.deaths);
            formData.append('_method', 'put');


            local.put(`/stats/${user.id}`, formData, {
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
                        <input type="text" onChange={handleForm} value={kills} name='kills' placeholder="Type here" className="input input-bordered w-full max-w-xs" /><span style={errorStyle}>{errors.name?.message}</span>
                        </label>
                        </div>
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