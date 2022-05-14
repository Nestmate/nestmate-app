import { ExclamationIcon } from "@heroicons/react/outline";
import { LoadingOverlay } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConnectionById } from "../../api/NestmateApi";
import { ConnectionDetail } from "../../components/connections/ConnectionDetail";
import { EmptyState } from "../../components/elements/empty/EmptyState";
import { UserContext } from "../../context/user.context";

export const Connection = ( { } ) => {

    const { conId } = useParams();
    const { token, isLoading, user } = useContext(UserContext);
    const [ connection, setConnection ] = useState(null);

    useEffect(() => {

        if (token) {

            (async () => {

                try{

                    const { data } = await getConnectionById( conId, token);

                    if(data){
                        setConnection(data);
                    }


                }catch(err){

                    showNotification({
                        title: 'Error',
                        message: err.message,
                        color: 'red',
                        icon: <ExclamationIcon />
                    });
                }

            })();

        }

    }, [ isLoading ] );

    return (
        <div>

                { isLoading && <LoadingOverlay /> }
                { !isLoading && connection && <ConnectionDetail connection={ connection } token={ token } user={ user } /> }
                { !isLoading && !connection && <EmptyState 
                    title={`Whoops, couldn't find connection.`} 
                    subtitle={`Thats happens you know, sometimes we can make a little mistake.`} 
                    cta={`Connections`}
                    /> }

        </div>
    )
}
