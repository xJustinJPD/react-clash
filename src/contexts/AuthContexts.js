import { useContext, createContext, useState } from 'react';

const AuthContext = createContext(null);

export function useAuth(){
    const value = useContext(AuthContext);

    return value;
}

export function AuthProvider(props){
    const [authenticated, setAuthenticated] = useState(false);
// added role and id and encrypt them and push them to local storage
    return (
        <AuthContext.Provider
            value={{
                authenticated,
                onAuthenticated: (auth, token) => {
                    setAuthenticated(auth);
                
                    if(auth && token){
                        localStorage.setItem('token', token);
                    }
                    else if(!auth){
                        localStorage.removeItem('token');
                    }
                }
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}