import {
    IAddTaskAction,
    IDeleteTaskAction,
    IProject,
    ISetModalIsOpen,
    ISetProjects,
    ISetSelectedProjectId,
    ISetTaskToEditId,
    ISetsSearchValue,
    ITask,
    IUpdateTaskAction
} from "../types";

export const addTask = (projectId: string, task: ITask): IAddTaskAction => ({
    type: 'addTask',
    payload: {projectId, task}
})

export const deleteTask = (projectId: string, taskId: string): IDeleteTaskAction => ({
    type: 'deleteTask',
    payload: {projectId, taskId}
})

export const updateTask = (projectId: string, taskId: string, updatedTask: ITask): IUpdateTaskAction => ({
    type: 'updateTask',
    payload: {projectId, taskId, updatedTask}
})

export const setSelectedProjectId = (projectId: string): ISetSelectedProjectId => ({
    type: 'setSelectedProjectId',
    payload:  {projectId} 
})

export const setProjects = (projects: IProject[]): ISetProjects => ({
    type: 'setProjects',
    payload: {projects}
})

export const setModalIsOpen = (modalIsOpen: boolean): ISetModalIsOpen => ({
    type: 'setModalIsOpen',
    payload: {modalIsOpen}
})

export const setTaskToEditId = (taskId: string): ISetTaskToEditId => ({
    type: 'setTaskToEditId',
    payload: {taskId}
})

export const setSearchValue = (searchValue: string ): ISetsSearchValue => ({
    type: 'setSearchValue',
    payload: {searchValue}
})
