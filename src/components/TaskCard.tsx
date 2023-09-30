import moment from "moment";
import { AiOutlineFire, AiOutlineEdit } from "react-icons/ai";
import { ITask, Priority, TaskStatus } from "../types";
import { useAppDispatch } from "../redux/redux-hooks";
import { setModalIsOpen, setTaskToEditId } from "../redux/actions";

interface TaskCardProps {
    task: ITask
}

const TaskCard = ({ task }: TaskCardProps) => {
    const { num, title, description, createdAt, finishedAt, priority, status } = task;

    const dispatch = useAppDispatch(); 

    const onTaskEdit = () => {
        dispatch(setModalIsOpen(true));
        dispatch(setTaskToEditId(task.id));
    }
    
    const startDate = moment(createdAt);
    const endDate = finishedAt ? moment(finishedAt) : moment();
    const timeDiff = endDate.diff(startDate, 'minutes');

    const priorityColor = priority === Priority.LOW ?
        'green' :
        (priority === Priority.HIGH ? 'orange' : 'red');
    
    return (
        <div className="task-card">
            <div className="task-title-wrap">
                <div className="task-priority-wrap">
                    <span className="task-card-num">{num}</span>
                    <h3 className="task-card-text">{title}</h3>
                    <AiOutlineFire color={priorityColor} size={20}/>
                </div>
                <button className="task-edit-button">
                    <AiOutlineEdit size={20} onClick={onTaskEdit}/>
                </button>
            </div>
            <p className="task-card-text">{description}</p>
            <div className="task-label-wrap">
                <span className="task-card-label">
                    Created at: {moment(createdAt).format('YYYY-MM-DD h:mm')}
                </span>
                {status !== TaskStatus.QUEUE && (
                <span className="task-card-label">
                        In work: {timeDiff} {timeDiff > 1 ? "minutes" : "minute"}
                </span>
                )}
                {status === TaskStatus.DONE && (
                    <span className="task-card-label">
                        Finished at: {moment(finishedAt).format('YYYY-MM-DD h:mm')}
                    </span>
                )}
            </div>  
        </div>
    )
}

export default TaskCard;