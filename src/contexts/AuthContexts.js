import { useContext, createContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function useAuth(){
    const value = useContext(AuthContext);

    return value;
}

export function AuthProvider(props){
    const [authenticated, setAuthenticated] = useState(false);
    const [userInfo, setUserInfo] = useState({ id: null, role: [] });

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserInfo = localStorage.getItem('userInfo');

        if (storedToken && storedUserInfo) {
            setAuthenticated(true);
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                userInfo,
                onAuthenticated: (auth, token, id, role) => {
                    setAuthenticated(auth);
                    
                    if (auth && token) {
                        localStorage.setItem('token', token);
                        setUserInfo({ id, role });
                        localStorage.setItem('userInfo', JSON.stringify({ id, role }));
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
