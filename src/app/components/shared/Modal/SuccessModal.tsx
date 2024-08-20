'use client'

interface SuccessModalProps {
    message: string;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg text-black">
                <h2 className="text-xl font-bold mb-4">Success</h2>
                <p className="mb-4">{message}</p>
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;