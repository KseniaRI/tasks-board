import {AiOutlinePaperClip } from "react-icons/ai";

interface TaskCardFilesProps {
    files: string[];
    onFilesShow: (index: number) => void;
}

const TaskCardFiles = ({ files, onFilesShow }: TaskCardFilesProps) => {
    return (
        <div className="task-card-section">
            <span className="section-icon">
                <AiOutlinePaperClip size={20} />
            </span>
            <ul className="task-card-files">
                {files?.length > 0 && files.map((file,index) => (
                    <li
                        key={`${file}-${index}`}
                        className="task-card-file"
                        onClick={()=>onFilesShow(index)}
                    >
                        <img src={file} alt="file"/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TaskCardFiles;