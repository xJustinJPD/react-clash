import { useContext, createContext, useState, useEffect } from 'react';

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

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserInfo = localStorage.getItem('userInfo');
        const storedRefreshToken = localStorage.getItem('refreshToken');

        if (storedToken && storedUserInfo) {
            setAuthenticated(true);
            setUserInfo(JSON.parse(storedUserInfo));
            setAccessToken(storedToken);
            setRefreshToken(storedRefreshToken);
        } else {
            setAuthenticated(false);
            setAccessToken(null);
            setUserInfo({ id: null, role: [] });
            setRefreshToken(null);
        }
    }, []);

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(
                'https://discord.com/api/oauth2/token',
                new URLSearchParams({
                    client_id: process.env.REACT_APP_DISCORD_CLIENT_ID,
                    client_secret: process.env.REACT_APP_SECRET,
                    refresh_token: refreshToken,
                    grant_type: 'refresh_token',
                    redirect_uri: process.env.REACT_APP_REDIRECT_URI
                }).toString(),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            );
            
            const newAccessToken = response.data.access_token;
            setAccessToken(newAccessToken);
            localStorage.setItem('token', newAccessToken);
        } catch (error) {
            console.error(error);
        }
    };

    const clearAccessToken = () => {
        localStorage.removeItem('token');
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                userInfo,
                accessToken,
                refreshToken,
                onAuthenticated: (auth, token, id, role, refresh) => {
                    setAuthenticated(auth);
                    
                    if (auth && token) {
                        localStorage.setItem('token', token);
                        setAccessToken(token);
                        setUserInfo({ id, role });
                        localStorage.setItem('userInfo', JSON.stringify({ id, role }));
                        
                      
                        if (refresh) {
                            localStorage.setItem('refreshToken', refresh);
                            setRefreshToken(refresh);
                        }
                    } else if (!auth) {
                        clearAccessToken();
                    }
                },
                refreshAccessToken
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
