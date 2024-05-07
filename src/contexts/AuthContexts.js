import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function useAuth() {
    const value = useContext(AuthContext);
    return value;
}

export function AuthProvider(props) {
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({ id: null, role: [] });
    const [accessToken, setAccessToken] = useState(null);
    const [refreshToken, setRefreshToken] = useState(null);
    const [discordInfo, setDiscordInfo] = useState({username: null})
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserInfo = localStorage.getItem('userInfo');

        if (storedToken && storedUserInfo) {
            setAuthenticated(true);
            setUserInfo(JSON.parse(storedUserInfo));
        } else {
            setAuthenticated(false);
        }

        const storedAccessToken = localStorage.getItem('accessToken');
        const storedRefreshToken = localStorage.getItem('refreshToken');
        const storedDiscordInfo = localStorage.getItem('discordInfo');

        if (storedAccessToken && storedRefreshToken && storedDiscordInfo) {
            setAccessToken(JSON.parse(storedAccessToken));
            setRefreshToken(JSON.parse(storedRefreshToken));
            setDiscordInfo(JSON.parse(storedDiscordInfo));
        }
    }, []);
    useEffect(() => {
        // Refresh tokens every 60 seconds if access token and refresh token are available
        const timer = setInterval(() => {
            if (refreshToken) {
                refreshTokens();
            }
        }, 2000);

        return () => clearInterval(timer);
    }, [accessToken, refreshToken]);

    const refreshTokens = async () => {
        try {
            const response = await axios.post(
                'https://discord.com/api/oauth2/token',
                new URLSearchParams({
                    client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
                    client_secret: process.env.REACT_APP_SECRET_DISCORD,
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken,
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );

            const newAccessToken = response.data.access_token;

            // Update access token in state and localStorage
            setAccessToken(newAccessToken);
            localStorage.setItem('accessToken', newAccessToken);

            // Fetch user information with the new access token
            const refreshedUserInfo = await axios.get('https://discord.com/api/v10/users/@me', {
                headers: {
                    Authorization: `Bearer ${newAccessToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const { username } = refreshedUserInfo.data;

            // Update user information in state and localStorage
            setDiscordInfo({ username });
            localStorage.setItem('discordInfo', JSON.stringify({ username }));
        } catch (error) {
            console.error('Error refreshing tokens:', error);
        }
    };
    useEffect(() => {
        if (accessToken && refreshToken && discordInfo) {
            const storedToken = localStorage.getItem('token');
            const storedUserInfo = localStorage.getItem('userInfo');
            const storedAccessToken = localStorage.getItem('accessToken');
            const storedRefreshToken = localStorage.getItem('refreshToken');
            const storedDiscordInfo = localStorage.getItem('discordInfo');
            
            if (storedToken && storedUserInfo) {
                setAuthenticated(true);
                setAccessToken(JSON.parse(storedAccessToken));
                setRefreshToken(JSON.parse(storedRefreshToken));
                setDiscordInfo(JSON.parse(storedDiscordInfo));
                setUserInfo(JSON.parse(storedUserInfo));
            } else {
                setAuthenticated(false);
            }
        }
    }, [accessToken, refreshToken, discordInfo]);
    

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                userInfo,
                refreshToken,
                accessToken,
                discordInfo,
                onAuthenticated: (auth, token, id, role, username, refreshToken, accessToken) => {
                    setAuthenticated(auth);
                
                    if (auth && token) {
                        setUserInfo({ id, role });
                        localStorage.setItem('token', token);
                        localStorage.setItem('userInfo', JSON.stringify({ id, role }));
                        if (refreshToken && accessToken && username) {
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);
                            setDiscordInfo({ username });
                            setUserInfo({ id, role });
                            localStorage.setItem('token', token);
                            localStorage.setItem('userInfo', JSON.stringify({ id, role }));
                            localStorage.setItem('accessToken', accessToken);
                            localStorage.setItem('refreshToken', refreshToken);
                            localStorage.setItem('discordInfo', JSON.stringify({username}));

                        }
                    } else if (!auth) {
                        localStorage.removeItem('token');
                        setUserInfo({ id: null, role: [] });
                        localStorage.removeItem('userInfo');
                    }
                }
                
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
