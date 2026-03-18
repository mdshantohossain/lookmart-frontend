import { API_URL } from "@/config/env";
import { useQuery } from "@tanstack/react-query";

export default function getBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/brands`, {
        next: {
          revalidate: 60 * 1200,
        },
      });

      if (!res.ok) return null;

      const { data } = await res.json();

      return data;
    },
  });
}
 