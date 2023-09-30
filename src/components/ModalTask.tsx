import { createPortal } from "react-dom";
import { MouseEvent, FormEvent, useState } from 'react';
import { GrClose } from 'react-icons/gr';
import { ITask, Priority, TaskStatus } from "../types";
import { useAppDispatch, useAppSelector } from "../redux/redux-hooks";
import { addTask, setModalIsOpen, setTaskToEditId, updateTask } from "../redux/actions";
import { getProjects, getSelectedProjectId, getTaskToEditId, getTasksOfSelectedProject } from "../redux/selectors";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";

const modalTaskRoot = document.querySelector('#modal-task')!;

interface IFormData {
    title: string;
    description: string;
    priority: Priority;
}

const ModalTask = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const taskToEditId = useAppSelector(getTaskToEditId); 
    
    const taskToEdit = tasks.find(task => task.id === taskToEditId);
    
    const initialFormData = taskToEdit ?
        {
            title: taskToEdit.title,
            description: taskToEdit.description,
            priority: taskToEdit.priority
        } :
        {
            title: '',
            description: '',
            priority: Priority.LOW
        };

    const [formData, setFormData] = useState<IFormData>(initialFormData);

    const onClose = () => {
        dispatch(setModalIsOpen(false));
        dispatch(setTaskToEditId(''));
    }
    const handleBackdropClick = (evt: MouseEvent<HTMLDivElement>) => {
        if (evt.currentTarget === evt.target) {
          onClose()
        }
    };

    const handleInputChange = (evt: FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.currentTarget;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const { title, description, priority } = formData;
        let updatedTasks: ITask[] = [];

        if (!taskToEdit) {
            const newTask = {
                id: uuidv4(),
                num: tasks.length + 1,
                title,
                description,
                createdAt: moment().format(),
                finishedAt: null,
                priority,
                status: TaskStatus.QUEUE
            }
            dispatch(addTask(projectId, newTask));
            updatedTasks = [...tasks, newTask];
        } else {
            const editedTask = {
                ...taskToEdit,
                title,
                description,
                priority
            }
            dispatch(updateTask(projectId, taskToEditId, editedTask));
            updatedTasks = tasks.map(task => (task.id === taskToEditId ? editedTask : task));
        }

        const updatedProjects = projects.map(project => {
                if (project.id !== projectId) {
                    return project;
                } else {
                    return {
                        ...project,
                        tasks: updatedTasks
                    }
                }
            })
            
        localStorage.setItem("projects", JSON.stringify(updatedProjects));
        setFormData(initialFormData);
        onClose();
    }

    const priorities = Object.values(Priority);
    const priorityOptions = priorities.map(priority => (
        <option key={priority} value={priority}>{priority}</option>)
    );

    return createPortal(
        <div className="backdrop" onClick={handleBackdropClick}>
            <div className="modal-task">
                <button className="modal-task-close" onClick={onClose}>
                    <GrClose />
                </button>
                <h3>{taskToEdit ? 'Edit task' : 'Create a new task'}</h3>
                <form className="modal-task-form" onSubmit={handleSubmit}>
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="title">
                            Task title:
                        </label>
                        <input
                            className="form-field"
                            name="title" id="title"
                            type="text"
                            onChange={handleInputChange}
                            defaultValue={taskToEdit?.title}
                            maxLength={40}
                            required
                        />
                    </div>
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="description">
                            Task description:
                        </label>
                        <textarea
                            className="form-field"
                            name="description"
                            id="description"
                            onChange={handleInputChange}
                            defaultValue={taskToEdit?.description}
                            maxLength={150}
                            required
                        />
                    </div>
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="priority">
                            Task priority:
                        </label>
                        <select
                            className="form-field"
                            name="priority"
                            id="priority"
                            onChange={handleInputChange}
                            defaultValue={taskToEdit?.priority || Priority.LOW}
                            required
                        >
                            {priorityOptions}
                        </select>
                    </div>
                    <button className="modal-task-submit" type="submit" disabled={!formData.title || !formData.description}>
                        {taskToEdit ? 'Edit Task' : 'Add task'}
                    </button>
                </form>
            </div>
        </div>,
        modalTaskRoot
    )
}

export default ModalTask;