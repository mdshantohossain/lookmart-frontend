import { API_URL } from "@/config/api";
import api from "@/config/axios-config";
import { useMutation } from "@tanstack/react-query"

export const useOrderSubmit = () => {
    return useMutation({
        mutationKey: ["order-submit"],
        mutationFn: async (data: any) => {
            const response = await api.post(`${API_URL}/place-order`, data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        },
    })
}