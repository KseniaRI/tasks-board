export enum Priority {
    'CRITICAL' = 'critical',
    'HIGH' = 'high',
    'LOW' = 'low'
}

export enum TaskStatus {
    'QUEUE' = 'Queue',
    'DEV' = 'Dev',
    'DONE' = 'Done'
}

export interface ITask {
    id: string,
    num: number,
    title: string,
    description: string,
    createdAt: string,
    finishedAt: string | null,
    priority: Priority,
    status: TaskStatus
}

export interface IProject{
    id: string,
    name: string,
    author: string,
    tasks: ITask[]
} 

export interface AppState {
    projects: IProject[]; 
    selectedProjectId: string;
    modalIsOpen: boolean;
    taskToEditId: string;
    searchValue: string ;
}

export interface IAddTaskAction{
    type: 'addTask',
    payload: {
        projectId: string,
        task: ITask
    }
}

export interface IDeleteTaskAction{
    type: 'deleteTask',
    payload: {
        projectId: string,
        taskId: string
    }
}

export interface IUpdateTaskAction{
    type: 'updateTask',
    payload: {
        projectId: string,
        taskId: string,
        updatedTask: ITask
    }
}

export interface ISetSelectedProjectId {
    type: 'setSelectedProjectId',
    payload: {
        projectId: string
    }
}

export interface ISetModalIsOpen {
    type: 'setModalIsOpen';
    payload: {
        modalIsOpen: boolean
    }
}

export interface ISetTaskToEditId {
    type: 'setTaskToEditId',
    payload: {
        taskId: string
    }
}

export interface ISetProjects {
    type: 'setProjects',
    payload: {
        projects: IProject[]
    }
}

export interface ISetsSearchValue {
    type: 'setSearchValue',
    payload: {
        searchValue: string 
    }
}

export type TaskActionType = IAddTaskAction | IDeleteTaskAction | IUpdateTaskAction | ISetSelectedProjectId | ISetModalIsOpen | ISetTaskToEditId | ISetProjects | ISetsSearchValue;