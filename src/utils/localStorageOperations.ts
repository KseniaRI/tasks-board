import { toast } from "react-toastify";
import { IProject, ITask } from "../types";

export const saveToLocalStorage = (key: string, data: any): void => {
    try {
        localStorage.setItem(key, data);
    } catch (error: any) {
        if (error instanceof DOMException && error.name === "QuotaExceededError") {
            toast.error("Exceeded local storage quota. Cannot save data.")
        } else {
            toast.error(`Error saving data to local storage: ${error.message}`);
        }
    }
};

export const updateProjectsInLocalstorage = (projects: IProject[], projectId: string, updatedTasks: ITask[]) => {
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
    saveToLocalStorage("projects", JSON.stringify(updatedProjects));
}