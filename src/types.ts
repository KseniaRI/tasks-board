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

export interface IComment {
    id: string,
    text: string,
    replies: IComment[];
}

export interface IFormData {
    title: string;
    description: string;
    priority: Priority;
    file: string | undefined;
}
export interface ISubtask {
    id: string;
    parentTaskId: string;
    num: number;
    title: string;
    description: string;
    doneStatus: boolean;
}
export interface ITask {
    id: string;
    num: number;
    title: string;
    description: string;
    createdAt: string;
    finishedAt: string | null;
    priority: Priority;
    status: TaskStatus;
    files: string[];
    comments: IComment[];
    subtasks: ISubtask[];
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
    taskId: string;
    fileIdx: number;
    searchValue: string;
    modalTaskIsOpen: boolean;
    modalFilesIsOpen: boolean;
    modalCommentsIsOpen: boolean;
    modalSubtaskIsOpen: boolean;
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
    type: 'setModalTaskIsOpen' | 'setModalFilesIsOpen' | 'setModalCommentsIsOpen' | 'setModalSubtaskIsOpen';
    payload: {
        modalIsOpen: boolean
    }
}

export interface ISetTaskId {
    type: 'setTaskId',
    payload: {
        taskId: string
    }
}

export interface ISetFileIdx {
    type: 'setFileIdx',
    payload: {
        fileIdx: number;
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

export type TaskActionType = IAddTaskAction | IDeleteTaskAction | IUpdateTaskAction | ISetSelectedProjectId | ISetModalIsOpen | ISetTaskId | ISetProjects | ISetsSearchValue | ISetFileIdx;