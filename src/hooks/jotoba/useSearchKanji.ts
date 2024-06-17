import { useMutation } from "@tanstack/react-query";
import { JotobaApi } from "../../api/JotobaApi";

type Props = {
  kanji: string;
};

export const useSearchKanji = () => {
  return useMutation({
    mutationFn: ({ kanji }: Props) => JotobaApi.postKanjiSearch(kanji),
  });
};
