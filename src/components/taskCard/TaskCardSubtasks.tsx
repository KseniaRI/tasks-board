import { LuFiles } from 'react-icons/lu';
import { MdAdd } from 'react-icons/md';
import { ITask } from '../../types';
import { useDispatch } from 'react-redux';
import { setModalSubtaskIsOpen, setTaskId } from '../../redux/actions';
import SubtaskCard from './SubtaskCard';

interface TaskCardTasksProps {
    task: ITask;
}

const TaskCardSubtasks = ({ task }: TaskCardTasksProps) => {
    const dispatch = useDispatch();

    const onAddSubtaskClick = () => {
        dispatch(setModalSubtaskIsOpen(true));
        dispatch(setTaskId(task.id));
    }

    return (
        <div className='task-card-section'>
            <span className="section-icon"><LuFiles size={17} /></span>
            {task.subtasks.length === 0 && <p className='section-text'>You can add subtasks</p>}
            {task.subtasks.length > 0 && (
                <ul className='subtasks-list'>
                    {task.subtasks.map((subtask) => {
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
                onClick={onAddSubtaskClick}
            >
                <MdAdd size={20} />
            </button>
        </div>
    )
}

export default TaskCardSubtasks;