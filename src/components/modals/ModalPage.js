import { useEffect,useState } from "react";
import { Modal,UnstyledButton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";

export const ModalPage = ({ children, size = 'xl' }) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsOpen(true), 1);
    },[]);

    const onDismiss = () => {
        setIsOpen(false);
        setTimeout(() => navigate(-1),300);
    }

    return (
        
        <Modal
            transition={'slide-up'}
            centered
            transitionDuration={300}
            onClose={onDismiss}
            opened={isOpen}
            withCloseButton={false}
            radius={'lg'}
            size={ size }
            style={{}}
        >
            <UnstyledButton onClick={onDismiss} className="absolute right-0" style={{top: '-40px'}}><XIcon className="text-white w-6 h-6"/></UnstyledButton>
            
            { children }
            
        </Modal>
    )
}
