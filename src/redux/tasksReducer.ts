import { AppState, IProject, TaskActionType } from '../types';

const projectsData: IProject[] = require('../utils/projects.json');

const initialState: AppState = {
    projects: projectsData,
    selectedProjectId: '',
    taskId: '',
    fileIdx: 0,
    searchValue: '',
    modalTaskIsOpen: false,
    modalFilesIsOpen: false,
    modalCommentsIsOpen: false,
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
        case ('setTaskId'): {
            return {
                ...state,
                taskId: action.payload.taskId
            }
        }
        case ('setFileIdx'): {
            return {
                ...state,
                fileIdx: action.payload.fileIdx
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
        case ('setSearchValue'): {
            return {
                ...state,
                searchValue: action.payload.searchValue
            }
        }
        case ('setModalTaskIsOpen'): {
            return {
                ...state,
                modalTaskIsOpen: action.payload.modalIsOpen
            }
        }
        case ('setModalFilesIsOpen'): {
            return {
                ...state,
                modalFilesIsOpen: action.payload.modalIsOpen
            }
        }
        case ('setModalCommentsIsOpen'): {
            return {
                ...state,
                modalCommentsIsOpen: action.payload.modalIsOpen
            }
        }
        default:
            return state;   
    }
}

export default tasksReducer;