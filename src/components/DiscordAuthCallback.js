import axios from 'axios';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContexts';
const DiscordAuthCallback = () => {
    const [local, discord] = axios;
  useEffect(() => {
    // Extract code from URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const { onAuthenticated } = useAuth();
    // Send code to backend
    discord.post('/auth/discord/callback', { code })
      .then(response => {
        
        console.log(response.data);
        const accessToken = response.data.access_token;
        onAuthenticated(true, accessToken);
        window.location.href = '/teams';
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  }, [discord, onAuthenticated]); 

  return null; 
};

export default DiscordAuthCallback;
