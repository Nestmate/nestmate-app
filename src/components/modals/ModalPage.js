import { useEffect,useState } from "react";
import { Modal,useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ModalPage = ({ children, size }) => {
    const theme = useMantineTheme();

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
            transitionDuration={300}
            overflow="outside"
            opened={isOpen}
            onClose={onDismiss}
            radius={'lg'}
            size={ size ? size : '1024px' }
        >
        { children }
        </Modal>
    )
}
