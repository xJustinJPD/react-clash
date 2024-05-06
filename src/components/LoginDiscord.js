import React from 'react';

const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;


const LoginDiscord = () => {
  const handleLogin = () => {
    
    const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;

    window.location.href = oauthUrl;
  };

  return (
    <div>
      <h2>Login with Discord</h2>
      <button onClick={handleLogin}>Login with Discord</button>
    </div>
  );
};

export default LoginDiscord;
