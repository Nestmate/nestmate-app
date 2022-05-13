import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Navigate } from "react-router-dom";
import { IsLoading } from "./IsLoading";

export const IsOnboarded = ({ children }) => {

    const { isOnboarded, isLoggedIn, user, isLoading } = useContext(UserContext);
    
    if (isLoading) return <IsLoading loading={ isLoading }/>

    { isOnboarded && isLoggedIn && <Navigate to='/mates' /> }

    return children;
}