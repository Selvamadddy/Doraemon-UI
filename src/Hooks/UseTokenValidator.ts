import { useEffect } from "react";
import { GetWidget } from "../Components/Dashboard/Api/Widget";

export default function useTokenValidator() {
    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem("auth_token");
            if (!token) return;
            try {
                const response = await GetWidget();
                if (!response.success) {
                    localStorage.removeItem("auth_token");
                    window.location.href = "/login";
                }
            }
            catch {
                localStorage.removeItem("auth_token");
                window.location.href = "/login";
            }
        };

        checkToken();

        const interval = setInterval(checkToken, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);
}