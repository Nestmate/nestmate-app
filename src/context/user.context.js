import { createContext,useEffect,useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { verify } from '../api/NestmateApi';

const UserContext = createContext();

function UserProviderWrapper({children}){
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    

    const storeToken = (token) => localStorage.setItem('nestmate_authToken', token);

    const removeToken = () => localStorage.removeItem('nestmate_authToken');

    const getToken = () => localStorage.getItem('nestmate_authToken');

    const authenticateUser = () => {

        const storedToken = getToken();
        console.log(storedToken);
        if(storedToken){
            //verify token
            (async () => {

                try{
                    const { data } = await verify(storedToken);
                    setUser(data);
                    setIsLoggedIn(true);
                    
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
            authenticateUser,
            logoutUser,
            isLoading}}>

            {children}

        </UserContext.Provider>
    )
}

export { UserContext, UserProviderWrapper };