export async function PostRequest<TResponse, TRequest = unknown>(
  request: TRequest,
  apiName: string
): Promise<TResponse | null> {
  try {
    console.log("started api call");
    const response = await fetch(`/apim${apiName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "bdb0acb68cd14a3aaf5476627f673c23",
      },
      body: JSON.stringify(request),
    });
    console.log("ended api call");

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return null;
    }

    const data: TResponse = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Network Error:", error);
    return null;
  }
}

export async function GetRequestWithoutBody<TResponse>(
  apiName: string
): Promise<number | null> {
  try {
    console.log("started api call");
    const response = await fetch(`/apim${apiName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": "bdb0acb68cd14a3aaf5476627f673c23",
        'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
      }
    });
    console.log("ended api call");

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText);
      return 400;
    }

    return 200;
  }
  catch (error: unknown) {
    console.error("Network Error:", error);
    return null;
  }
}



export interface ApiResponse<T> {
  success: boolean;
  status: number;
  data: T | null;
  error?: string;
}

interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  payload?: unknown;
  includeAuth?: boolean;
  includeSubscriptionKey?: boolean;
  customHeaders?: Record<string, string>;
}

export async function ApiRequest<T>(apiName: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> 
{
  try {
    const {
      method = "GET",
      payload,
      includeAuth = false,
      includeSubscriptionKey = false,
      customHeaders = {}
    } = options || {};

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...customHeaders
    };

    // Optional Auth
    if (includeAuth) {
      const token = localStorage.getItem("auth_token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // Optional APIM Subscription Key
    if (includeSubscriptionKey) {
      headers["Ocp-Apim-Subscription-Key"] = "bdb0acb68cd14a3aaf5476627f673c23";
    }

    const response = await fetch(`/apim${apiName}`, {
      method,
      headers,
      body: payload ? JSON.stringify(payload) : undefined
    });

    const status = response.status;

    let data: T | null = null;

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const text = await response.text();
      data = text ? (JSON.parse(text) as T) : null;
    }

    if (!response.ok) {
      return {
        success: false,
        status,
        data,
        error: response.statusText
      };
    }

    return {
      success: true,
      status,
      data
    };
  } catch (error: any) {
    return {
      success: false,
      status: 500,
      data: null,
      error: error?.message || "Network error"
    };
  }
}