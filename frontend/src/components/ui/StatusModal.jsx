import Modal from "./Modal";
import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info
} from "lucide-react";

const STATUS_CONFIG = {
    success: {
        icon: CheckCircle,
        color: "text-green-500",
        button: "bg-green-500 hover:bg-green-600"
    },
    error: {
        icon: XCircle,
        color: "text-red-500",
        button: "bg-red-500 hover:bg-red-600"
    },
    warning: {
        icon: AlertTriangle,
        color: "text-yellow-500",
        button: "bg-yellow-500 hover:bg-yellow-600"
    },
    info: {
        icon: Info,
        color: "text-blue-500",
        button: "bg-blue-500 hover:bg-blue-600"
    }
};

const StatusModal = ({
    isOpen,
    onClose,
    status = "success",
    title,
    message
}) => {

    const config = STATUS_CONFIG[status];
    const Icon = config.icon;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="text-center">

                <Icon
                    size={64}
                    className={`mx-auto mb-4 ${config.color}`}
                />

                <h2 className="text-2xl font-semibold mb-2">
                    {title}
                </h2>

                <p className="text-gray-600 mb-6">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className={`text-white px-6 py-2 rounded-lg transition ${config.button}`}
                >
                    OK
                </button>

            </div>
        </Modal>
    );
};

export default StatusModal;
