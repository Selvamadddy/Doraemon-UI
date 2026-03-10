import { ApiRequest, type ApiResponse } from "../../../API/ApiCall";
import type ProfileSettingModel from "../Model/ProfileSettingModel";

const base = "/commonservice/User/v1";

// export const GetUserDetail = async () => {

//   const response = await fetch("https://localhost:32771/User/v1/GetUserDetail",{
//      method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
//     }
//   });

//   if (!response.ok)
//     return { success: false };

//   const data = await response.json();

//   return {
//     success: true,
//     data: data
//   };

// };

export async function GetUserDetail(): Promise<ApiResponse<ProfileSettingModel>> {
    const result = await ApiRequest<ProfileSettingModel>(`${base}/GetUserDetail`, {
        method: "GET",
        includeAuth: true,
        includeSubscriptionKey: true
    });
    return result;
}


// export const UpdateUserDetail = async (data: ProfileSettingModel) => {

//   const response = await fetch("https://localhost:32771/User/v1/SaveUserDetail", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
//     },
//     body: JSON.stringify(data)
//   });

//   if (!response.ok)
//     return { success: false };

//   const result = await response.json();

//   return {
//     success: true,
//     data: result
//   };

// };

export async function UpdateUserDetail(payload: ProfileSettingModel): Promise<ApiResponse<null>> {
    const result = await ApiRequest<null>(`${base}/SaveUserDetail`, {
        method: "POST",
        includeAuth: true,
        payload: payload,
        includeSubscriptionKey: true
    });
    return result;
}


// export const UploadProfileImage = async (file: File) => {

//   const formData = new FormData();
//   formData.append("file", file);

//   const response = await fetch("https://localhost:32771/User/v1/SaveUserImage", {
//     headers: {
//         'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
//     },
//     method: "POST",
//     body: formData
//   });

//   if (!response.ok)
//     return { success: false };

//   const data = await response.json();

//   return {
//     success: true,
//     imageUrl: data.imageUrl
//   };

// };

export async function UploadProfileImage(payload: File): Promise<ApiResponse<null>> {
    const formData = new FormData();
   formData.append("file", payload);
    const result = await ApiRequest<null>(`${base}/SaveUserImage`, {
        method: "POST",
        includeAuth: true,
        formData: formData,
        includeSubscriptionKey: true
    });
    return result;
}