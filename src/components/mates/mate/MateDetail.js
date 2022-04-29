import { useEffect,useState,useContext } from "react";
import { getUserByUsername } from "../../../api/NestmateApi";
import { MateGallery } from "./MateGallery";
import { MateHeader } from "./MateHeader";
import { UserContext } from "../../../context/user.context";
import { useParams } from "react-router-dom";

export const MateDetail = () => {
    const { username } = useParams();
    const [mate, setMate] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getToken } = useContext(UserContext);

   const token = getToken;

    useEffect(() => {
        (async () => {
            const { data } = await getUserByUsername(username);
            setMate(data);
            setIsLoading(false);
        })();
    },[username])

    return (
        <div className="max-w-screen-lg mx-auto md:px-8 md:pb-8">
            {isLoading && <p>Loading ...</p>}
            {!isLoading && mate && <>
                <MateHeader mate={mate} />
                {/* <MatetDetailInfo mate={mate} /> */}
            </>}
        </div>
    )
}
