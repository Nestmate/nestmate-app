import { useContext } from "react";
import { UserContext } from "../context/user.context";
import { Navigate } from "react-router-dom";
import { IsLoading } from "./IsLoading";

export const IsPrivate = ({ children }) => {

    const { isLoggedIn, isOnboarded, isLoading } = useContext(UserContext);

    if (isLoading) return <IsLoading loading={isLoading}/>
    if (!isOnboarded && isLoggedIn) return <Navigate to="/auth/onboarding/personal" />;
    if (!isLoggedIn) return <Navigate to="/auth/signin"/>;
    
    return children;
}