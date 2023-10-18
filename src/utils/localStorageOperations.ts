import { toast } from 'react-toastify';
import { IProject, ITask } from '../types';

export const saveToLocalStorage = (key: string, data: string): void => {
    try {
        localStorage.setItem(key, data);
    } catch (error: unknown) {
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            toast.error('Exceeded local storage quota. Cannot save data.');
        } else if (error instanceof Error) {
            toast.error(`Error saving data to local storage: ${error.message}`);
        } else {
            toast.error('Unknown error occurred while saving data to local storage.');
        }
    }
};

export const updateProjectsInLocalstorage = (
    projects: IProject[],
    projectId: string,
    updatedTasks: ITask[],
) => {
    const updatedProjects = projects.map(project => {
        if (project.id !== projectId) {
            return project;
        } else {
            return {
                ...project,
                tasks: updatedTasks,
            };
        }
    });
    saveToLocalStorage('projects', JSON.stringify(updatedProjects));
};
