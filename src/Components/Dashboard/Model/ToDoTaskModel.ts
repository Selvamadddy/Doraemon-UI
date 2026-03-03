export default interface ToDoTaskModel
{
    id : number,
    title: string,
    dueDate: Date,
    severity: number,
    note: string,
    status: boolean
}

export interface GetTasksPayload{
    Filter : {
        Severity : number | null,
        Status : boolean | null,
        DueDate : Date | null,
        CretaedDate : Date | null
    },
    SearchKey : string | null,
    Pagination : {
        Count : number,
        Offset : number,
        Limit: number,
        SortOrder : string | null,
        SortBy : string | null
    }
}

export interface SaveTaskPayload{
    toDoTask : ToDoTaskModel
}