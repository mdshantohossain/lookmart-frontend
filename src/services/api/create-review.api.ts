import { API_URL } from "@/config/env";
import { useAppSelector } from "@/features/hooks";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useCreateReview = () => {
  const { token } = useAppSelector((state) => state.auth);

  return useMutation({
    mutationKey: ["create-review"],
    mutationFn: async (data: {
      product_id: number;
      message: string;
      rating: number;
    }) => {
      console.log(data);
      const res = await axios.post(`${API_URL}/create-review`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });
};
