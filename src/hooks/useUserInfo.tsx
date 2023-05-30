import { WaniKaniAPI } from "../api/WaniKaniApi";
import { useQuery } from "@tanstack/react-query";
import { UserData } from "../types/MiscTypes";

type Props = {
  token: string | undefined;
};

// TODO: increase time to wait between data fetches
export const useUserInfo = ({ token }: Props) => {
  return useQuery({
    queryKey: ["user-info", token],
    queryFn: WaniKaniAPI.getUser,
    enabled: !!token,
    select: (data) => data.data as UserData,
  });
};
