import { createSelector } from 'reselect';
import { RootState } from './store';

export const getProjects = (state: RootState) => state.projects;

export const getSelectedProjectId = (state: RootState) => state.selectedProjectId;

export const getModalTaskIsOpen = (state: RootState) => state.modalTaskIsOpen;

export const getModalFilesIsOpen = (state: RootState) => state.modalFilesIsOpen;

export const getModalCommentsIsOpen = (state: RootState) => state.modalCommentsIsOpen;

export const getTaskId = (state: RootState) => state.taskId;

export const getSearchValue = (state: RootState) => state.searchValue;

export const getFileIdx = (state: RootState) => state.fileIdx;

export const getSelectedProject = createSelector(
    [getSelectedProjectId, getProjects],
    (selectedProjectId, projects)=>{
        return projects.find(project => project.id === selectedProjectId);
    }
)

export const getTasksOfSelectedProject = createSelector(
    [getSelectedProject],
    (selectedProject) =>{
        return selectedProject ? selectedProject.tasks : [];
    }
)

export const getTask = createSelector(
    [getTasksOfSelectedProject, getTaskId],
    (tasks, taskId) => {
        return tasks.find(task => task.id === taskId);
    }
)
export const getFilteredTasks = createSelector(
    [getTasksOfSelectedProject, getSearchValue],
    (tasks, searchValue) => {
        const filteredTasks = tasks.filter(task => {
            const titleMatch = task.title.toLowerCase().includes(searchValue.toLowerCase());
            const numMatch = task.num.toString() === searchValue;
            return titleMatch || numMatch;
        })
        return filteredTasks;
    }
)

export const getFilesOfTask = createSelector(
    [getTasksOfSelectedProject, getTaskId],
    (tasks, taskId) => {
        return tasks.find(task => task.id === taskId)?.files;
    }
)




