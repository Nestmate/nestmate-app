import { createContext,useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { verify } from '../api/NestmateApi';

const UserContext = createContext();

function UserProviderWrapper({children}){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isOnboarded, setIsOnboarded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState(null);
    

    const storeToken = (token) => localStorage.setItem('nestmate_authToken', token);

    const removeToken = () => localStorage.removeItem('nestmate_authToken');

    const getToken = () => localStorage.getItem('nestmate_authToken');

    const authenticateUser = () => {

        const storedToken = getToken();
        
        if(storedToken){
            //verify token
            setToken(storedToken);

            (async () => {

                try{
                    const { data } = await verify(storedToken);
                    setUser(data.user);
                    setIsLoggedIn(true);
                    setIsOnboarded(data.user.isOnboarded);
                    
                }catch(err){
                    setUser(null);
                    setIsLoggedIn(false);
                }finally {
                    setIsLoading(false);
                }
                
            })();

        }else{
            setUser(null);
            setIsLoggedIn(false);
            setIsLoading(false);
            setIsOnboarded(false);
        }

        

    }

    const logoutUser = () => {
        removeToken();
        authenticateUser();
        navigate('/auth/signin');
    }

    useEffect(() => {

        authenticateUser();

    }, []);


    return (
        <UserContext.Provider value={{
            user,
            setUser,
            isLoggedIn,
            storeToken,
            getToken,
            token,
            authenticateUser,
            logoutUser,
            isOnboarded,
            isLoading}}>

            {children}

        </UserContext.Provider>
    )
}

export { UserContext, UserProviderWrapper };