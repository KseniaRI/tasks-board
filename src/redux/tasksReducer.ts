import { AppState, IProject, TaskActionType } from '../types';
// import { combineReducers } from 'redux';

const projectsData: IProject[] = require('../utils/projects.json');

const initialState: AppState = {
    projects: projectsData,
    selectedProjectId: '',
    modalIsOpen: false,
    taskToEditId: '',
    searchValue: ''
}

function tasksReducer(state: AppState = initialState, action: TaskActionType): AppState {
    switch (action.type) {
        case ('addTask'): {
            const updatedProjects = state.projects.map(project => {
                if (project.id !== action.payload.projectId) {
                    return project;
                } else {
                    return {
                        ...project,
                        tasks: [...project.tasks, action.payload.task]
                    }
                }
            })
            return {
                ...state,
                projects: updatedProjects,
                selectedProjectId: action.payload.projectId
            };
        }
        case ('deleteTask'): {
            const updatedProjects = state.projects.map(project => {
                if (project.id !== action.payload.projectId) {
                    return project;
                } else {
                    const remainingTasks = project.tasks.filter(task => task.id !== action.payload.taskId)
                    return {
                        ...project,
                        tasks: remainingTasks
                    }
                }
            })
            return {
                ...state,
                projects: updatedProjects,
                selectedProjectId: action.payload.projectId
            }
        }
        case ('updateTask'): {
            const updatedProjects = state.projects.map(project => {
                if (project.id !== action.payload.projectId) {
                    return project;
                } else {
                    const updatedTasks = project.tasks.map(task => {
                        if (task.id !== action.payload.taskId) {
                            return task;
                        } else {
                            return action.payload.updatedTask;
                        }
                    })
                    return {
                        ...project,
                        tasks: updatedTasks
                    };
                }
            })
            return {
                ...state,
                projects: updatedProjects,
                selectedProjectId: action.payload.projectId
            }
        }
        case ('setTaskToEditId'): {
            return {
                ...state,
                taskToEditId: action.payload.taskId
            }
        }
        case ('setSelectedProjectId'): {
            return {
                ...state,
                selectedProjectId: action.payload.projectId
            }
        }
        case ('setProjects'): {
            return {
                ...state,
                projects: action.payload.projects
            }
        }
        case ('setModalIsOpen'): {
            return {
                ...state,
                modalIsOpen: action.payload.modalIsOpen
            }
        }
        case ('setSearchValue'): {
            return {
                ...state,
                searchValue: action.payload.searchValue
            }
        }
        default:
            return state;   
    }
}

// const initialModalState = {
//     modalIsOpen: false
// }
// interface IModalState {
//     modalIsOpen: boolean
// }
// function modalReducer (state: IModalState = initialModalState, action: ISetModalIsOpen): IModalState {
//     return {
//         modalIsOpen: action.payload.modalIsOpen
//     }
// }

export default tasksReducer;