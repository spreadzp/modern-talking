import { DiscussionModal } from "./DiscussionModal";
import { ModalProps } from "./modal.interfaces"; 
import RewardModal from "./RewardModal";

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit, nameSubmit, typeModal }) => {
    switch (typeModal) {
        case 'Discussion':
            return <DiscussionModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} nameSubmit={nameSubmit} />;
        case 'Survey':
            return <DiscussionModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} nameSubmit={nameSubmit} />;
        case 'DataSet':
            return <DiscussionModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} nameSubmit={nameSubmit} />;
        case 'Voting':
            return <DiscussionModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} nameSubmit={nameSubmit} />;
        case 'Reward':
            return <RewardModal isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} nameSubmit={nameSubmit} />;
 
        default:
            return null;
    }
};