import { useEffect,useState } from "react";
import { Modal,useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ModalPage = ({ children }) => {
    const theme = useMantineTheme();

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    console.log(children);

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
            overflow="outside"
            opened={isOpen}
            onClose={onDismiss}
            overlayOpacity={0.55}
            overlayBlur={40}
            radius={'lg'}
            size="1024px"
        >
        { children }
        </Modal>
    )
}
