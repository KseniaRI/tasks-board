import { MouseEvent } from 'react';

export const handleBackdropClick = (evt: MouseEvent<HTMLDivElement>, onClose: () => void) => {
    if (evt.currentTarget === evt.target) {
        onClose();
    }
};


