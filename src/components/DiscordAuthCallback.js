import { useEffect } from 'react';
import axios from '../config/Api';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContexts';

const DiscordAuthCallback = () => {
  const { onAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [local,picture,discord ] = axios;

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    discord.get('/auth/discord/callback', { params: { code } })
      .then(response => {
        const { access_token } = response.data;
        console.log(response.data)
        if (access_token) {
        //   onAuthenticated(true, access_token);
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
