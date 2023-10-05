import { AiFillFire, AiOutlineComment, AiOutlineEdit, AiOutlinePaperClip } from "react-icons/ai";
import { ITask, Priority } from "../../types";
import { countComments } from "../../utils/commonHelpers";

interface TaskCardSidebarProps {
    task: ITask,
    onTaskEdit: () => void,
    onFilesShow: (index: number) => void,
    onCommentsShow: () => void
}
    
const TaskCardSidebar = ({ task, onTaskEdit, onFilesShow, onCommentsShow }: TaskCardSidebarProps) => {

    const priorityColor = task.priority === Priority.LOW ?
        'green' :
        (task.priority === Priority.HIGH ? 'orange' : 'red');

    const totalComments = countComments(task);
    
    return (
        <div className="task-card-sidebar">
            <span className="task-card-priority">
                <AiFillFire color={priorityColor} size={20} />
            </span>
            <button className="task-sidebar-button edit" onClick={onTaskEdit}>
                <AiOutlineEdit size={20}/>
            </button>
            {task.files.length > 0 && (
                <button className="task-sidebar-button files" onClick={()=>onFilesShow(0)}>
                    <AiOutlinePaperClip size={20} />
                    <span>{task.files.length}</span>
                </button>
            )}
            <button className="task-sidebar-button comments" onClick={onCommentsShow}>
                <AiOutlineComment size={20} />
                <span>{task.comments.length > 0 ? totalComments : null}</span>
            </button> 
        </div>
    )
}

export default TaskCardSidebar;