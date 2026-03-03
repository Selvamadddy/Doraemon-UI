import { ApiRequest } from "./ApiCall"

const base = "/identity/v1/api";

export async function GetOtp(email: string): Promise<boolean> {
    const result = await ApiRequest<null>(`${base}/user/GenerateOtp`, {
        method: "POST",
        payload: {
            email: email
        },
        includeAuth: false,
        includeSubscriptionKey: true
    });
    return result.success;
}

interface ValidateOtpResponse{
    token : string | null
}

export async function ValidateOtp(otp: string, email : string): Promise<string | null | undefined> {
    const result = await ApiRequest<ValidateOtpResponse>(`${base}/user/OtpValidation`, {
        method: "POST",
        payload: {
            email: email,
            otp: otp
        },
        includeAuth: false,
        includeSubscriptionKey: true
    });
    return result?.data?.token;
}

export async function ResetOldPassword(email : string, newPassword: string, token : string): Promise<boolean> {
    const result = await ApiRequest<null>(`${base}/user/RestPassword`, {
        method: "POST",
        payload: {
            email: email,
            password: newPassword,
            token: token
        },
        includeAuth: false,
        includeSubscriptionKey: true
    });
    return result.success;
}