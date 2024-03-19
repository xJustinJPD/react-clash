import { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import axios from '../config/Api';
import axios from '../config/Api';

const Edit = () => {
    const { id } = useParams();
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
        axios.get(`/teams/${id}`, {
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

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     setForm(prevState => ({
    //         ...prevState,
    //         image: file || prevState.image // Keep the previous value if no new file is selected
    //     }));
    // };
    
    
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
        e.preventDefault()
        console.log('submitted', form);

        if(isRequired(['name','size'])){
                        //created a new form data object
                        let formData = new FormData();
                        //append adds the new data to the associated values
                        formData.append('name', form.name);
                        formData.append('size', form.size);
                        // formData.append('image', form.image);


            axios.put(`/teams/${id}`, form, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"

                }   
            })
            .then(response => {
                navigate(`/teams/${id}`);
            })
            .catch(err => {
                console.error(err);
            });
        }
        
    };

    

    if(!team) return( <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner text-primary"></span></div>);

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
            {/* <div className='m-3'>
            <label className="form-control w-full max-w-xs">
            <div className="label">
            <span className="label-text">Team Image</span>
            <span className="label-text-alt">Image</span>
            </div>
            <input type="file" onChange={handleImageChange} name='image' className="file-input file-input-bordered w-full max-w-xs" />
            </label>
            </div> */}


            <input type='submit' className="btn btn-success m-3" />
            </form>
        </div>
    );
};

export default Edit;