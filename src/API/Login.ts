import { PostRequest, GetRequestWithoutBody, ApiRequest } from "./ApiCall";

interface SignInRequest {
  email: string;
  password: string;
  clientId: string;
  secretKey: string;
}

interface TokenResponse {
  token?: {
    access_Token: string;
  };
}

interface CacheToken {
  value: string;
  expiry: number; // timestamp
}

const base = "/identity/v1/api";

export default async function SignIn(
  email: string,
  password: string
): Promise<number> {
  try {
    const request: SignInRequest = {
      email,
      password,
      clientId: "a0281797-94e6-42f5-81a8-0ce93d936df6",
      secretKey: "EgNDKC55Io0Dp5wmga8PsmtMCj2ZVnSy62RuPeXZp15",
    };

    const response: TokenResponse | null = await PostRequest(
      request,
      `${base}/token`
    );

    if (!response?.token?.access_Token) {
      return 401;
    }

    localStorage.setItem("auth_token", response.token.access_Token);

    return 200; // Success
  } catch (error: unknown) {
    console.error("SignIn Error:", error);
    return 500; // Internal error
  }
}

export async function SignOut(): Promise<number> {
  try {

    const response: number | null = await GetRequestWithoutBody(
      `${base}/signout`
    );

    if (response != null && response != 200) {
      return 401;
    }

    return 200; // Success
  } 
  catch (error: unknown) {
    console.error("SignIn Error:", error);
    return 500; // Internal error
  }
}

export async function RegisterApi(email : string, newPassword: string, name : string): Promise<boolean> {
    const result = await ApiRequest<null>(`${base}/user/registerUser`, {
        method: "POST",
        payload: {
            email: email,
            password: newPassword,
            name: name
        },
        includeAuth: false,
        includeSubscriptionKey: true
    });
    return result.success;
}