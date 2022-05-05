import { PaperAirplaneIcon } from "@heroicons/react/solid"


export const SendMessageButton = ({user,mate}) => {

    const onHandeMessageUser = (e) => {
        e.preventDefault();
        if(user) return console.log(`Send message to ${mate.username}`);
        return console.log('Create Account Modal');
    }

    return (
        
        <button  className="button" onClick={onHandeMessageUser}><PaperAirplaneIcon className="button-icon"/></button>
    )
}
