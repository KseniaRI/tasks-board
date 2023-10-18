import {
    IAddTaskAction,
    IDeleteTaskAction,
    IProject,
    ISetFileIdx,
    ISetModalIsOpen,
    ISetProjects,
    ISetSelectedProjectId,
    ISetTaskId,
    ISetsSearchValue,
    ITask,
    IUpdateTaskAction,
} from '../types';

export const addTask = (projectId: string, task: ITask): IAddTaskAction => ({
    type: 'addTask',
    payload: { projectId, task },
});

export const deleteTask = (projectId: string, taskId: string): IDeleteTaskAction => ({
    type: 'deleteTask',
    payload: { projectId, taskId },
});

export const updateTask = (
    projectId: string,
    taskId: string,
    updatedTask: ITask,
): IUpdateTaskAction => ({
    type: 'updateTask',
    payload: { projectId, taskId, updatedTask },
});

export const setSelectedProjectId = (projectId: string): ISetSelectedProjectId => ({
    type: 'setSelectedProjectId',
    payload: { projectId },
});

export const setProjects = (projects: IProject[]): ISetProjects => ({
    type: 'setProjects',
    payload: { projects },
});

export const setModalTaskIsOpen = (modalIsOpen: boolean): ISetModalIsOpen => ({
    type: 'setModalTaskIsOpen',
    payload: { modalIsOpen },
});

export const setModalFilesIsOpen = (modalIsOpen: boolean): ISetModalIsOpen => ({
    type: 'setModalFilesIsOpen',
    payload: { modalIsOpen },
});

export const setModalCommentsIsOpen = (modalIsOpen: boolean): ISetModalIsOpen => ({
    type: 'setModalCommentsIsOpen',
    payload: { modalIsOpen },
});

export const setModalSubtaskIsOpen = (modalIsOpen: boolean): ISetModalIsOpen => ({
    type: 'setModalSubtaskIsOpen',
    payload: { modalIsOpen },
});

export const setTaskId = (taskId: string): ISetTaskId => ({
    type: 'setTaskId',
    payload: { taskId },
});

export const setFileIdx = (fileIdx: number): ISetFileIdx => ({
    type: 'setFileIdx',
    payload: { fileIdx },
});

export const setSearchValue = (searchValue: string): ISetsSearchValue => ({
    type: 'setSearchValue',
    payload: { searchValue },
});
