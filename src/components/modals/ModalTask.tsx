import { createPortal } from "react-dom";
import { FormEvent, useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { addTask, setModalTaskIsOpen, setTaskId, updateTask } from "../../redux/actions";
import { getProjects, getSelectedProjectId, getTask, getTaskId, getTasksOfSelectedProject } from "../../redux/selectors";
import { handleBackdropClick } from "../../utils/common";
import { updateProjectsInLocalstorage } from "../../utils/localStorageOperations";
import { ITask, Priority, TaskStatus } from "../../types";
import CloseBtn from "../CloseBtn";

const modalTaskRoot = document.querySelector('#modal-task')!;

interface IFormData {
    title: string;
    description: string;
    priority: Priority;
    file: string;
}

const ModalTask = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const taskToEditId = useAppSelector(getTaskId); 
    const taskToEdit = useAppSelector(getTask);
    
    const initialFormData = taskToEdit ?
        {
            title: taskToEdit.title,
            description: taskToEdit.description,
            priority: taskToEdit.priority,
            file: ''
        } :
        {
            title: '',
            description: '',
            priority: Priority.LOW,
            file: ''
        };

    const [formData, setFormData] = useState<IFormData>(initialFormData);

    const onClose = () => {
        dispatch(setModalTaskIsOpen(false));
        dispatch(setTaskId(''));
    }

    const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }  

    const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const maxSizeInBytes = 102400; // 100KB в байтах - чтобы не переполнять localStorage
        const files = e.target.files;

        if (files && files[0].size > maxSizeInBytes) { 
            alert("Файл слишком большой. Максимальный размер файла 100KB.");
            e.target.value = ''; 
            return;
        } else if (files) {
            const fileUploaded = files[0];
            let reader = new FileReader();
            reader.onloadend = () => {
                if (typeof (reader.result) === "string") {
                    setFormData({
                        ...formData,
                        file: reader.result
                    });
                }
            };
            if (fileUploaded instanceof Blob) {
                reader.readAsDataURL(fileUploaded);
            } else {
                alert("Invalid file format.");
            }
        } 
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const { title, description, priority, file } = formData;
        let updatedTasks: ITask[] = [];
        const files = file.length > 0 ? [file] : []; 

        if (!taskToEdit) {
            const newTask = {
                id: uuidv4(),
                num: tasks.length + 1,
                title,
                description,
                createdAt: moment().format(),
                finishedAt: null,
                priority,
                status: TaskStatus.QUEUE,
                files,
                comments: []
            }
            dispatch(addTask(projectId, newTask));
            updatedTasks = [...tasks, newTask];
        } else {
            const editedTask = {
                ...taskToEdit,
                title,
                description,
                priority,
                files: [...taskToEdit.files, file]
            }
            dispatch(updateTask(projectId, taskToEditId, editedTask));
            updatedTasks = tasks.map(task => (task.id === taskToEditId ? editedTask : task));
        }

        updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        setFormData(initialFormData);
        onClose();
    }

    const priorities = Object.values(Priority);
    const priorityOptions = priorities.map(priority => (
        <option key={priority} value={priority}>{priority}</option>
    ));

    return createPortal(
        <div className="backdrop" onClick={(evt)=>handleBackdropClick(evt, onClose)}>
            <div className="modal-task">
                <CloseBtn onClose={onClose}/>  
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
                    <div className="form-field-wrap">
                        <label className="form-label" htmlFor="file">
                            Attach file:
                        </label> 
                        <input
                            className="form-field"
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleUpload}
                            accept=".jpg, .jpeg, .png"
                        />
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