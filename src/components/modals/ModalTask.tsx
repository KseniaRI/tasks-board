import { createPortal } from "react-dom";
import { FormEvent, useState, ChangeEvent, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/redux-hooks";
import { addTask, setModalTaskIsOpen, setTaskId, updateTask } from "../../redux/actions";
import { getProjects, getSelectedProjectId, getTask, getTasksOfSelectedProject } from "../../redux/selectors";
import { handleBackdropClick } from "../../utils/commonHelpers";
import { updateProjectsInLocalstorage } from "../../utils/localStorageOperations";
import { ITask, Priority, TaskStatus } from "../../types";
import CloseBtn from "../CloseBtn";
import TaskForm from "./TaskForm";

export interface IFormData {
    title: string;
    description: string;
    priority: Priority;
    file: string | undefined;
}

const modalTaskRoot = document.querySelector('#modal-task')!;

const ModalTask = () => {
    const dispatch = useAppDispatch();
    const projectId = useAppSelector(getSelectedProjectId);
    const projects = useAppSelector(getProjects);
    const tasks = useAppSelector(getTasksOfSelectedProject);
    const taskToEdit = useAppSelector(getTask);
    
    const onClose = useCallback(() => {
        dispatch(setModalTaskIsOpen(false));
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

    const initialFormData: IFormData = taskToEdit ?
        {
            title: taskToEdit.title,
            description: taskToEdit.description,
            priority: taskToEdit.priority,
            file: undefined
        } :
        {
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

    const handleUpload = (evt: ChangeEvent<HTMLInputElement>) => {
        const maxSizeInBytes = 500000; // ограничение в байтах - чтобы не переполнять localStorage
        const files = evt.target.files;

        if (files && files[0].size > maxSizeInBytes) { 
            toast.error("The file is too large. Maximum file size 100KB.");
            evt.target.value = ''; 
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
                toast.error("Invalid file format.");
            }
        } 
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const { title, description, priority, file } = formData;
        
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();
        if (trimmedTitle === '' || trimmedDescription === '') {
            return;
        }

        let updatedTasks: ITask[] = [];
        const files = (file && file.length > 0) ? [file] : []; 

        if (!taskToEdit) {
            const newTask = {
                id: uuidv4(),
                num: tasks.length + 1,
                title: trimmedTitle,
                description: trimmedDescription,
                createdAt: moment().format(),
                finishedAt: null,
                priority,
                status: TaskStatus.QUEUE,
                files,
                comments: [],
                subtasks: []
            }
            dispatch(addTask(projectId, newTask));
            updatedTasks = [...tasks, newTask];
        } else {
            const files = file ? [...taskToEdit.files, file] : taskToEdit.files;
            const editedTask = {
                ...taskToEdit,
                title,
                description,
                priority,
                files
            }
            dispatch(updateTask(projectId, taskToEdit.id, editedTask));
            updatedTasks = tasks.map(task => task.id === taskToEdit.id ? editedTask : task); 
        }

        updateProjectsInLocalstorage(projects, projectId, updatedTasks);
        setFormData(initialFormData);
        onClose();
    }

    const defaultValues = {
        title: taskToEdit?.title,
        description: taskToEdit?.description,
        priority: taskToEdit?.priority
    }

    return createPortal(
        <div className="backdrop" onClick={(evt)=>handleBackdropClick(evt, onClose)}>
            <div className="modal-task">
                <CloseBtn onClose={onClose}/>  
                <h3>{taskToEdit ? 'Edit task' : 'Create a new task'}</h3>
                <TaskForm
                    handleSubmit={handleSubmit}
                    handleInputChange={handleInputChange}
                    handleUpload={handleUpload}
                    defaultValues={defaultValues}
                    type={taskToEdit ? 'Edit task' : 'Add task'}
                />
            </div>
        </div>,
        modalTaskRoot
    )
}

export default ModalTask;