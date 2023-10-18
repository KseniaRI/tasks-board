import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { setModalFilesIsOpen, setTaskId } from '../../redux/actions';
import { getFileIdx, getFilesOfTask } from '../../redux/selectors';
import { handleBackdropClick } from '../../utils/commonHelpers';
import CloseBtn from '../CloseBtn';

const modalFilesRoot = document.querySelector('#modal-files');
if (!modalFilesRoot) {
    throw new Error('Modal task root element not found');
}

const ModalFiles = () => {
    const dispatch = useAppDispatch();
    const fileIdx = useAppSelector(getFileIdx);
    const files = useAppSelector(getFilesOfTask);

    const onClose = useCallback(() => {
        dispatch(setModalFilesIsOpen(false));
        dispatch(setTaskId(''));
    }, [dispatch]);

    useEffect(() => {
        const handleKeyPress = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onClose]);

    const orderFiles = (files: string[], idx: number) => {
        if (files) {
            return [files[idx], ...files.slice(0, idx), ...files.slice(idx + 1)];
        } else return null;
    };

    const initialOrderedFiles = files && orderFiles(files, fileIdx);
    const [reorderedFiles, setReorderedFiles] = useState(initialOrderedFiles);

    const onFileClick = (index: number) => {
        if (reorderedFiles) {
            const newOrderedFiles = orderFiles(reorderedFiles, index);
            setReorderedFiles(newOrderedFiles);
        }
    };

    const reorderedFilesExist = reorderedFiles && reorderedFiles.length > 0;

    const filesItems =
        reorderedFilesExist &&
        reorderedFiles.map((file, index) => (
            <li
                key={`reordered-${file}-${index}`}
                className="modal-files-item"
                onClick={() => onFileClick(index)}
            >
                <img src={file} alt="file" />
            </li>
        ));

    return createPortal(
        <div className="backdrop" onClick={evt => handleBackdropClick(evt, onClose)}>
            <div className="modal-files">
                <CloseBtn onClose={onClose} />
                <ul className="modal-files-list">{filesItems}</ul>
            </div>
        </div>,
        modalFilesRoot,
    );
};

export default ModalFiles;
