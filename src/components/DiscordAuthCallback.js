import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';

const DiscordAuthCallback = () => {
  const location = useLocation();
  const { onAuthenticated } = useAuth(); 
  const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SECRET_DISCORD = process.env.REACT_APP_SECRET;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        const response = await axios.post(
          'https://discord.com/api/oauth2/token',
          new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: SECRET_DISCORD,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: REDIRECT_URI
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        //store the access token to keep the user logged into discord
        const access_token = response.data.access_token;

        const userInformation = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        // Update authentication context with user information
        onAuthenticated(true, access_token, userInformation.data.id, userInformation.data.role, response.data.refresh_token);

        setUserData(userInformation.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [CLIENT_ID, REDIRECT_URI, location.search, SECRET_DISCORD, onAuthenticated]);

  return (
    <div>
      {userData ? (
        <div>
          <h2>User Information</h2>
          <p>Username: {userData.username}</p>
          <Link to="/profile">Return to Profile</Link>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DiscordAuthCallback;
