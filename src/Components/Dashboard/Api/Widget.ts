import { ApiRequest } from "../../../API/ApiCall"
import type { ApiResponse } from "../../../API/ApiCall"

import type {WidgetsResponse} from "../Model/DashboardModel"

const base = "/commonservice/Dashboard/v1";

export async function GetWidget(): Promise<ApiResponse<WidgetsResponse>> {
    const result = await ApiRequest<WidgetsResponse>(`${base}/GetWidget`, {
        method: "GET",
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}

export async function GetUserWidget(): Promise<ApiResponse<WidgetsResponse>> {
    const result = await ApiRequest<WidgetsResponse>(`${base}/GetUserWidget`, {
        method: "GET",
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}

export async function AddUserWidget(widgetId : number): Promise<ApiResponse<null>> {
    const result = await ApiRequest<null>(`${base}/AddUserWidget`, {
        method: "POST",
        payload : {widgetIds : [widgetId]},
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}

export async function RemoveUserWidget(widgetId : number): Promise<ApiResponse<null>> {
    const result = await ApiRequest<null>(`${base}/RemoveUserWidget`, {
        method: "POST",
        payload : {widgetIds : [widgetId]},
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}