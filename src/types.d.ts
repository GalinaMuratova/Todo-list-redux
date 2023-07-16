export interface ITask {
    checked:boolean,
    id: string,
    title:string,
}

export interface IApiTask {
    [id:string]: ITask;
}
export interface TodoState {
    task: string;
    checked:boolean;
    loading: boolean;
    tasksLoading:boolean;
    error: boolean;
    taskMas:ITask[];
    id:string
}