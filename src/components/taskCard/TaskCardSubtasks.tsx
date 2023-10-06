import { useDispatch } from 'react-redux';
import { LuFiles } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';
import { ITask } from '../../types';
import { setModalSubtaskIsOpen, setTaskId } from '../../redux/actions';
import SubtaskCard from './SubtaskCard';

interface TaskCardTasksProps {
    task: ITask;
}

const TaskCardSubtasks = ({ task }: TaskCardTasksProps) => {
    const { id: taskId, subtasks } = task;
    
    const dispatch = useDispatch();

    const onAddSubtask = () => {
        dispatch(setModalSubtaskIsOpen(true));
        dispatch(setTaskId(taskId));
    }

    return (
        <div className='task-card-section'>
            <span className="section-icon">
                <LuFiles size={17} />
            </span>
            {subtasks.length === 0 && (
                <p className='section-text'>You can add subtasks</p>
            )}
            {subtasks.length > 0 && (
                <ul className='subtasks-list'>
                    {subtasks.map(subtask => {
                        return(
                            <li key={subtask.id}>
                                <SubtaskCard subtask={subtask} />
                            </li>
                        )
                    })}
                </ul>
            )} 
            <button
                type='button'
                className='section-btn'
                onClick={onAddSubtask}
            >
                <MdAdd size={20} />
            </button>
        </div>
    )
}

export default TaskCardSubtasks;