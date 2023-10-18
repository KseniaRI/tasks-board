import React from 'react';
import { AiOutlinePaperClip } from 'react-icons/ai';

interface TaskCardFilesProps {
    files: string[];
    onFilesShow: (index: number) => void;
}

const TaskCardFiles = ({ files, onFilesShow }: TaskCardFilesProps) => {
    const filesExist = files?.length > 0;

    const taskCardFiles =
        filesExist &&
        files.map((file, index) => (
            <li
                key={`${file}-${index}`}
                className="task-card-file"
                onClick={() => onFilesShow(index)}
            >
                <img src={file} alt="file" />
            </li>
        ));

    return (
        <div className="task-card-section">
            <span className="section-icon">
                <AiOutlinePaperClip size={20} />
            </span>
            <ul className="task-card-files">{taskCardFiles}</ul>
        </div>
    );
};

export default TaskCardFiles;
