export interface ITask {
    checked:boolean,
    id: string,
    title:string,
}

export interface IApiTask {
    [id:string]: ITask;
}