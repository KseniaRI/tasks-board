import { ITask } from "../../types";

interface TaskCardFilesProps {
    task: ITask;
    onFilesShow: (index: number) => void;
}

const TaskCardFiles = ({ task, onFilesShow }: TaskCardFilesProps) => {
    const { files } = task;
    return (
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
    )
}

export default TaskCardFiles;