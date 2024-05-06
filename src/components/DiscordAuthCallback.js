import { useEffect } from 'react';
import axios from '../config/Api';
import { useNavigate } from 'react-router-dom';

const DiscordAuthCallback = () => {
  const navigate = useNavigate();
  const [local,picture,discord] = axios;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    discord.post('/token?', null, {
      params: {
        client_id: '1237075531095343124',
        client_secret: 'HNRQaTSz5TkL98goSZCY5F8HLqq4Ic_y',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'https://clash-d9110.web.app/auth/discord/callback',
        scope: 'identify',
      }
    })
    .then(response => {
      const { access_token } = response.data;
      if (access_token) {
        navigate('/teams');
        alert("Authentication successful");
      } else {
        console.error("Error: Failed to authenticate or access token is missing.");
        navigate('/login');
        alert("Failed to authenticate, please try again later");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      navigate('/login');
      alert("An error occurred during authentication, please try again later");
    });
  }, [navigate]);

  return null;
};

export default DiscordAuthCallback;
