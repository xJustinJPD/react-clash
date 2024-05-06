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

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserInfo = localStorage.getItem('userInfo');

        if (storedToken && storedUserInfo) {
            setAuthenticated(true);
            setUserInfo(JSON.parse(storedUserInfo));
            setAccessToken(storedToken);
        } else {
            setAuthenticated(false);
            setAccessToken(null);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                userInfo,
                accessToken,
                onAuthenticated: (auth, token, id, role) => {
                    setAuthenticated(auth);
                    
                    if (auth && token) {
                        localStorage.setItem('token', token);
                        setAccessToken(token);
                        setUserInfo({ id, role });
                        localStorage.setItem('userInfo', JSON.stringify({ id, role }));
                    } else if (!auth) {
                        localStorage.removeItem('token');
                        setAccessToken(null);
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
