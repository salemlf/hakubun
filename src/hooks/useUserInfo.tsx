import { WaniKaniAPI } from "../api/WaniKaniApi";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "../types/MiscTypes";

type Props = {
  token: string | undefined;
};

// TODO: use in useAuth?
export const useUserInfo = ({ token }: Props) => {
  return useQuery({
    queryKey: ["user-info", token],
    queryFn: WaniKaniAPI.getUser,
    enabled: !!token,
    select: (data) => data.data as UserData,
  });
};
