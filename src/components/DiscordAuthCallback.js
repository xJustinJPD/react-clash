import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContexts';
import UserInfo from './userInfo';
const DiscordAuthCallback = () => {
  const location = useLocation();
  const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const SECRET_DISCORD = process.env.REACT_APP_SECRET;
  const [userData, setUserData] = useState([]);
  const { onAuthenticated } = useAuth();
  const token = localStorage.getItem('token'); 
  const userInfo = localStorage.getItem('userInfo');
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
        const { access_token, refresh_token } = response.data;

        const userInformation = await axios.get('https://discord.com/api/v10/users/@me', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const { username } = userInformation.data;
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        localStorage.setItem('discordInfo', JSON.stringify({ username }));
        onAuthenticated(true, token, userInfo, access_token, refresh_token, username);
        setUserData(userInformation.data.username);
        console.log(response.data, userInformation.data);
        
//         const response2 = await axios.post(
//           'https://discord.com/api/oauth2/token',
//           new URLSearchParams({
//             client_id: CLIENT_ID,
//             client_secret: SECRET_DISCORD,
//             grant_type: 'refresh_token',
//             refresh_token: response.data.refresh_token,
//           }).toString(),
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           }
//         );

//         const newAccessToken = response2.data.access_token;

// // Now use the new access token to fetch user information
// const refreshedUserInfo = await axios.get('https://discord.com/api/v10/users/@me', {
//   headers: {
//     Authorization: `Bearer ${newAccessToken}`,
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }
// });
// console.log(refreshedUserInfo.data);

        
      } catch (error) {
        console.error(error);
      }
    };
   
    fetchData();
  }, [CLIENT_ID, REDIRECT_URI, location.search,SECRET_DISCORD]);


  return (
    <UserInfo userData={userData} />
  );
};

export default DiscordAuthCallback;
