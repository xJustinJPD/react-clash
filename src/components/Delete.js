import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteBtn({id, resource, deleteCallback}) {
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const onDelete = () => {
        setIsLoading(true);
        let token = localStorage.getItem('token');

        axios.delete(`http://localhost/api/${resource}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => {
                    console.log(response.data);
                    deleteCallback(id);
                    // navigate('/');
                })
                .catch(err => {
                    console.log(err.response.data)
                });
    };

    return (
        <button onClick={onDelete} className="btn btn-outline btn-error">
            {isLoading ? "Deleting..." : "Delete"}
        </button>
    );
};