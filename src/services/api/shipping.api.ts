import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";



export function useShipping() {
    return useQuery({
        queryKey: ["shipping"],
        queryFn: async () => {
            const response = await fetch(`${API_URL}/shipping-charge`);
    
            if (!response.ok) return null;
    
            const { data } = await response.json();
    
            return data;
        },
    })
}