import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            {/* Overlay */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <div
                className="relative bg-white w-[90%] max-w-md rounded-2xl p-6 shadow-xl animate-in fade-in zoom-in duration-200"
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
