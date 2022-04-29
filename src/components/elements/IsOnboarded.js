import { useContext } from "react";
import { UserContext } from "../../context/user.context";
import { Navigate } from "react-router-dom";
import { IsLoading } from "./IsLoading";

export const IsOnboarded = ({ children }) => {

    const { isOnboarded, isLoading } = useContext(UserContext);

    if (isLoading) return <IsLoading loading={isLoading}/>
    
    if (isOnboarded) return <Navigate to="/mates"/>;
    
    return children;
}