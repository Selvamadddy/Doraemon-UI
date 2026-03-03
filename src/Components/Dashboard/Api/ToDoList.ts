import { ApiRequest } from "../../../API/ApiCall"
import type { ApiResponse } from "../../../API/ApiCall"

import type ToDoTaskModel from "../Model/ToDoTaskModel"
import type { GetTasksPayload, SaveTaskPayload } from "../Model/ToDoTaskModel"

const base = "/commonservice/ToDoTask/v1";

export async function GetTasks(payload: GetTasksPayload): Promise<ApiResponse<ToDoTaskModel[]>> {
    const result = await ApiRequest<ToDoTaskModel[]>(`${base}/GetTasks`, {
        method: "POST",
        includeAuth: true,
        payload: payload,
        includeSubscriptionKey: true
    });
    return result;
}

export async function SaveTask(payload: SaveTaskPayload): Promise<ApiResponse<null>> {
    const result = await ApiRequest<null>(`${base}/SaveTask`, {
        method: "POST",
        includeAuth: true,
        payload: payload,
        includeSubscriptionKey: true
    });
    return result;
}

export async function DeleteTask(id: number): Promise<ApiResponse<null>> {
    const result = await ApiRequest<null>(`${base}/DeleteTasks`, {
        method: "POST",
        includeAuth: true,
        payload: {
            "Ids": [id]
        },
        includeSubscriptionKey: true
    });
    return result;
}