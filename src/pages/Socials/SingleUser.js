import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserHero from "../Socials/components/UserHero";
import axios from '../../config/Api';

const SingleUser = () => {
  const [local] = axios;
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();
  // State to store the details of a single lecturer
  const [user, setUser] = useState(null);
  // Retrieving the user token from localStorage
  let token = localStorage.getItem('token');

  // Effect to fetch the details of a single Usser when the component mounts
  useEffect(() => {
    local
      .get(`/user/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        // Set the details of the lecturer in the state
        setUser(response.data.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);
 
  // If user data is not available, show a loading indicator
  if (!user) return (<div className="flex flex-col gap-4 w-52">
  <div className="skeleton h-32 w-full"></div>
  <div className="skeleton h-4 w-28"></div>
  <div className="skeleton h-4 w-full"></div>
  <div className="skeleton h-4 w-full"></div>
</div>);



  // JSX for the Single Lecturer component
  return (
    <UserHero
        user={user}
    />
  );
}

export default SingleUser;