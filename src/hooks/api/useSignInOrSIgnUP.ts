import { API_URL } from '@/config/env';
import { RegisterPayload } from '@/types';
import { useMutation } from '@tanstack/react-query'
import axios from 'axios';

export default function useSignInOrSIgnUP() {
  return useMutation({
    mutationKey: ["signInOrSIgnUP"],
    mutationFn: async (data: RegisterPayload) => {
      const res = await axios.post(`${API_URL}/signin/or/signup`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    },
  })
}
