import { createSelector } from 'reselect';
import { RootState } from './store';

export const getProjects = (state: RootState) => state.projects;

export const getSelectedProjectId = (state: RootState) => state.selectedProjectId;

export const getModalIsOpen = (state: RootState) => state.modalIsOpen;

export const getTaskToEditId = (state: RootState) => state.taskToEditId;

export const getSearchValue = (state: RootState) => state.searchValue;

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


