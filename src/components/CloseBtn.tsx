import React from 'react';
import { GrClose } from 'react-icons/gr';

interface CloseBtnProps {
    onClose: () => void;
}

const CloseBtn = ({ onClose }: CloseBtnProps) => {
    return (
        <button className="modal-close" onClick={onClose}>
            <GrClose />
        </button>
    );
};

export default CloseBtn;
