export type PronunciationVoice = {
  id: string;
  details: {
    // lol not accurate, but okay
    gender: "male" | "female";
    accent: "Kyoto" | "Tokyo";
  };
  displayName: string;
};
