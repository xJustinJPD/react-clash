import React from 'react';

const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const LoginDiscord = () => {
  const handleLogin = () => {
    const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify`;

    window.location.href = oauthUrl;
  };

  return (
    <div className="bg-gray-900 text-white py-20 pb-80">
      <div className="container mx-auto my-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Application</h1>
        <p className="text-lg mb-8">Connect with Discord to access our awesome features!</p>
        <img width="120" height="120" src="https://img.icons8.com/fluency/120/discord-logo.png" alt="discord-logo"/>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login with Discord
        </button>
        <p className="mt-12 text-sm">
          By clicking "Login with Discord", you agree to allow our application to access your Discord account
          for the purpose of authentication. We take your privacy and data protection seriously. Your Discord
          account information will only be used for authentication and will not be shared with any third parties
          without your consent.
        </p>
      </div>
    </div>
  );
};

export default LoginDiscord;
