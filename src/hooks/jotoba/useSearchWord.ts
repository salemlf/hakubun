import { useMutation } from "@tanstack/react-query";
import { JotobaApi } from "../../api/JotobaApi";

type Props = {
  word: string;
};

export const useSearchWord = () => {
  return useMutation({
    mutationFn: ({ word }: Props) => JotobaApi.postWordSearch(word),
  });
};
