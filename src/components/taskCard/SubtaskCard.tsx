import { useState } from 'react';
import { MdDoneOutline } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { getProjects, getSelectedProjectId, getTask, getTasksOfSelectedProject } from "../../redux/selectors";
import { ISubtask } from "../../types";
import { updateProjectsInLocalstorage } from '../../utils/localStorageOperations';
import { setTaskId, updateTask } from '../../redux/actions';

interface SubtaskCardProps {
    subtask: ISubtask;
}
const SubtaskCard = ({ subtask }: SubtaskCardProps) => {
    const { num, title, description } = subtask;
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const task = useAppSelector(getTask);
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const dispatch = useAppDispatch();
    const parentTaskNumber =  tasks.find(parentTask => parentTask.id === subtask.parentTaskId)?.num;
    
    const [isDone, setIsDone] = useState(subtask.doneStatus);
    const [showConfirm, setShowConfirm] = useState(false);

    const onDoneStatusChange = () => {
        dispatch(setTaskId(subtask.parentTaskId));
        setIsDone(!isDone);
        setShowConfirm(true);
    }  
    const onConfirmStatus = () => {
        const editedSubtask = {
            ...subtask,
            doneStatus: isDone
        }
        if (task) {
            const updatedSubasks = task.subtasks.map(task => task.id === subtask.id ? editedSubtask : task);
            const editedTask = {
                ...task,
                subtasks: updatedSubasks
            }
            dispatch(updateTask(projectId, task.id, editedTask));
            const updatedTasks = tasks.map(task => task.id === editedTask.id ? editedTask : task);
            updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        }
        setShowConfirm(false);
    }
    
    return (
        <div className='subtask-card'>
            <div className="task-title-wrap">
                <span className="task-card-num">{`${parentTaskNumber}.${num}`}</span>
                <h3 className="task-card-text">{title}</h3>
            </div>
            <p className="task-card-text">{description}</p>
            <div className='subtask-done-status'>
                <button className='subtask-done-btn' type='submit' onClick={onDoneStatusChange}>
                    {isDone ? <MdDoneOutline color='green' size={20} /> : null}
                </button>
                <span>{isDone ? 'Done' : 'Not done'}</span>
                {showConfirm && <button className='subtask-confirm-btn' onClick={onConfirmStatus}>Confirm?</button>}
            </div>
        </div>
    )
}

export default SubtaskCard;