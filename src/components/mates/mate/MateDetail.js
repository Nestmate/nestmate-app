import { useEffect,useState,useContext } from "react";
import { getUserByUsername } from "../../../api/NestmateApi";
import { MateGallery } from "./MateGallery";
import { MateHeader } from "./MateHeader";
import { UserContext } from "../../../context/user.context";
import { useParams } from "react-router-dom";
import { MateInfo } from "./MateInfo";

export const MateDetail = () => {
    const { username } = useParams();
    const [mate, setMate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useContext(UserContext);

   const token = getToken();

    useEffect(() => {
        (async () => {
            const { data } = await getUserByUsername(username,token);
            setMate(data);
            console.log(data);
            setIsLoading(false);
        })();
    },[username])

    return (
        <div className="max-w-screen-lg mx-auto lg:p-6">
            {isLoading && <p>Loading ...</p>}
            {!isLoading && mate && <>
                <MateHeader mate={ mate } />
                <MateGallery className="py-6 overflow-hidden" images={ mate.images } />
                <MateInfo mate={ mate }/>
            </>}
        </div>
    )
}
