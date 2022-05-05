import { useEffect,useState } from "react";
import { Modal,useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const ModalPage = ({ children }) => {
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
            transitionTimingFunction={'cubic-bezier(0,.7,.3,.1)'}
            overflow="outside"
            opened={isOpen}
            onClose={onDismiss}
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            radius={'lg'}
            size="1024px"
        >
        { children }
        </Modal>
    )
}
