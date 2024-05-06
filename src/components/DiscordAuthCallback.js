import { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DiscordAuthCallback = () => {
  const location = useLocation();
  const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const code = urlParams.get('code');

        const response = await axios.post(
          'https://discord.com/api/oauth2/token',
          new URLSearchParams({
            client_id: CLIENT_ID,
            client_secret: 'HNRQaTSz5TkL98goSZCY5F8HLqq4Ic_y',
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

        const access_token = response.data.access_token;

        const userInformation = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        console.log(response.data, userInformation.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [CLIENT_ID, REDIRECT_URI, location.search]);

  return null;
};

export default DiscordAuthCallback;
