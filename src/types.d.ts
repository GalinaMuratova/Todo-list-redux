export interface ITask {
    checked:boolean,
    id: string,
    title:string,
}

export interface ITaskMutation {
    checked:boolean,
    title:string,
}

export interface IApiTask {
    [id:string]: ITask;
}
export interface TodoState {
    loading: boolean;
    tasksLoading:boolean;
    error: boolean;
    taskMas:ITask[];
}