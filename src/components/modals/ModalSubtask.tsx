import { useEffect, useCallback, useState, ChangeEvent, FormEvent } from 'react';
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';
import { setModalSubtaskIsOpen, setTaskId, updateTask } from '../../redux/actions';
import { useAppDispatch, useAppSelector } from '../../redux/redux-hooks';
import { handleBackdropClick } from '../../utils/commonHelpers';
import { getProjects, getSelectedProjectId, getTask, getTaskId, getTasksOfSelectedProject } from '../../redux/selectors';
import { IFormData, ISubtask, Priority } from '../../types';
import { updateProjectsInLocalstorage } from '../../utils/localStorageOperations';
import TaskForm from './TaskForm';
import CloseBtn from "../CloseBtn";

const ModalSubtask = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const taskToEditId = useAppSelector(getTaskId); 
    const task = useAppSelector(getTask);

    const onClose = useCallback(() => {
        dispatch(setModalSubtaskIsOpen(false));
        dispatch(setTaskId(''));
    }, [dispatch])

    useEffect(() => {
        const handleKeyPress = (evt: KeyboardEvent) => {
            if (evt.key === 'Escape') {
              onClose();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [onClose]);

    const initialFormData: IFormData = {
            title: '',
            description: '',
            priority: Priority.LOW,
            file: undefined
        };
    
    const [formData, setFormData] = useState<IFormData>(initialFormData);

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }  

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const { title, description} = formData;

        if (task) {
            const newSubtask: ISubtask = {
                id: uuidv4(),
                parentTaskId: task.id,
                num: task?.subtasks.length + 1,
                title,
                description,
                doneStatus: false
            }
            const editedTask = {
                ...task,
                subtasks: [...task.subtasks, newSubtask]
            }
            dispatch(updateTask(projectId, taskToEditId, editedTask));
            const updatedTasks = [...tasks, editedTask];

            updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        }
        setFormData(initialFormData);
        onClose();
    }
    return (
        <div className="backdrop" onClick={(evt) => handleBackdropClick(evt, onClose)}>
            <div className="modal-task">
                <CloseBtn onClose={onClose} />
                <h3>Add subtask</h3>
                <TaskForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    type='Add subtask'
                />
            </div>
        </div>
    )
}

export default ModalSubtask;