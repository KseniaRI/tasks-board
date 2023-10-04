import { useAppDispatch } from "../../redux/redux-hooks";
import {
    setFileIdx,
    setModalCommentsIsOpen,
    setModalFilesIsOpen,
    setModalTaskIsOpen,
    setTaskId
} from "../../redux/actions";
import { ITask } from "../../types";
import TaskCardSidebar from "./TaskCardSidebar";
import TaskCardDates from "./TaskCardDates";
import TaskCardFiles from "./TaskCardFiles";

interface TaskCardProps {
    task: ITask
}

const TaskCard = ({ task }: TaskCardProps) => {
    const { num, title, description } = task;
    
    const dispatch = useAppDispatch(); 

    const onTaskEdit = () => {
        dispatch(setModalTaskIsOpen(true));
        dispatch(setTaskId(task.id));
    }
    
    const onFilesShow = (index: number) => {
        dispatch(setModalFilesIsOpen(true));
        dispatch(setTaskId(task.id));
        dispatch(setFileIdx(index));
    }

    const onCommentsShow = () => {
        dispatch(setModalCommentsIsOpen(true));
        dispatch(setTaskId(task.id));
    }

    return (
        <div className="task-card">
            <div className="task-card-content">
                <div className="task-title-wrap">
                    <span className="task-card-num">{num}</span>
                    <h3 className="task-card-text">{title}</h3>
                </div>
                <p className="task-card-text">{description}</p>
                <TaskCardFiles task={task} onFilesShow={onFilesShow}/>
                <TaskCardDates task={task}/>
            </div>
            <TaskCardSidebar
                task={task}
                onTaskEdit={onTaskEdit}
                onFilesShow={onFilesShow}
                onCommentsShow={onCommentsShow}
            />
        </div>
    )
}

export default TaskCard;