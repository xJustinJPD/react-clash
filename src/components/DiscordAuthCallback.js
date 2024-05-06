import { useEffect } from 'react';
import axios from '../config/Api';
import { useNavigate } from 'react-router-dom';

const DiscordAuthCallback = () => {
  const navigate = useNavigate();
  const [local,picture,discord] = axios;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    discord.post('/token', null, {
      params: {
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'YOUR_REDIRECT_URI',
        scope: 'identify email',
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
