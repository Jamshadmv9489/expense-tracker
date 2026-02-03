import { createContext, useContext, useState } from "react";
import StatusModal from "../components/ui/StatusModal";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {

    const [modal, setModal] = useState({
        open: false,
        status: "success",
        title: "",
        message: "",
        onClose: null
    });

    const showModal = ({ status = "success", title, message, onClose = null }) => {
        setModal({
            open: true,
            status,
            title,
            message,
            onClose
        });
    };

    const closeModal = () => {
        if (modal.onClose) {
            modal.onClose();
        }
        setModal(prev => ({ ...prev, open: false, onClose: null }));
    };

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}

            {/* Global Modal Render */}
            <StatusModal
                isOpen={modal.open}
                status={modal.status}
                title={modal.title}
                message={modal.message}
                onClose={closeModal}
            />

        </ModalContext.Provider>
    );
};
