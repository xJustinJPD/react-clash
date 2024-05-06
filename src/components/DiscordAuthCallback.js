import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DiscordAuthCallback = () => {
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        const response = await axios.post('https://discord.com/api/oauth2/token', null, {
          params: {
            client_id: '1237075531095343124',
            client_secret: 'HNRQaTSz5TkL98goSZCY5F8HLqq4Ic_y',
            grant_type: 'authorization_code',
            code: code.toString(),
            redirect_uri: 'https://clash-d9110.web.app/auth/discord/callback'
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });

        const access_token = response.data.access_token;

        const userInformation = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            'Authorization': `Bearer ${access_token}`,
          }
        });

        console.log(response.data, userInformation.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default DiscordAuthCallback;
