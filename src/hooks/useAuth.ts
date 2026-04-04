import { login } from "@/features/authSlice";
import { useAppDispatch } from "@/features/hooks";
import { UserType } from "@/types";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const authLogin = (user: UserType, token: string) => {
    toast.success("Login successful.");
    dispatch(login({ user, token }));

    queryClient.invalidateQueries({
      queryKey: ["addresses"],
    });

    queryClient.invalidateQueries({
      queryKey: ["total-orders"],
    });
  };

  return { authLogin };
};
