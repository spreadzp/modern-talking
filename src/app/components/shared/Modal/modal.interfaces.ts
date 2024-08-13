export type TypeModal = 'Discussion' | 'Survey' | 'DataSet' | 'Voting' | 'Reward';
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void; // Adjust the type as needed
    nameSubmit: string;
    typeModal: TypeModal;
}