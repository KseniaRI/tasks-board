import { useState } from 'react';
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { setModalFilesIsOpen, setTaskId } from "../../redux/actions";
import { getFileIdx, getFilesOfTask } from "../../redux/selectors";
import { handleBackdropClick } from "../../utils/common";
import CloseBtn from '../CloseBtn';

const modalFilesRoot = document.querySelector('#modal-files')!;

const ModalFiles = () => {
    const dispatch = useAppDispatch();
    const fileIdx = useAppSelector(getFileIdx);
    const files = useAppSelector(getFilesOfTask);

    const orderFiles = (files: string[], idx: number) => {
        if (files) {
            return [files[idx], ...files.slice(0, idx), ...files.slice(idx + 1)];
        } else return null;
    }

    const initialOrderedFiles = files && orderFiles(files, fileIdx);
    const [reorderedFiles, setReorderedFiles] = useState(initialOrderedFiles);

    const onClose = () => {
        dispatch(setModalFilesIsOpen(false));
        dispatch(setTaskId(''));
    }

    const onFileClick = (index: number) => {
        if (reorderedFiles) {
            const newOrderedFiles = orderFiles(reorderedFiles, index);
            setReorderedFiles(newOrderedFiles);
        }
    }

    return createPortal(
        <div className="backdrop" onClick={(evt)=>handleBackdropClick(evt, onClose)}>
            <div className="modal-files">
                <CloseBtn onClose={onClose}/>  
                <ul className="modal-files-list">
                    {(reorderedFiles && reorderedFiles.length > 0) && reorderedFiles.map((file,index) => (
                        <li key={`reordered-${file}-${index}`}
                            className="modal-files-item"
                            onClick={() => onFileClick(index)}
                        >
                            <img src={file} alt="file"/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>,
        modalFilesRoot
    )
}

export default ModalFiles;