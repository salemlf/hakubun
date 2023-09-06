import { useUserSettingsStore } from "../../stores/useUserSettings";
import { AUDIO_VOICES } from "../../constants";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import Label from "../Label";
import Card from "../Card";
import Selector, { SelectItem } from "../Selector";
import { SettingRow } from "../../styles/BaseStyledComponents";
import styled from "styled-components";

const SettingCategory = styled(Card)`
  display: flex;
`;

// TODO: use voice setting
function GeneralSettings() {
  const pronunciationVoice = useUserSettingsStore.use.pronunciationVoice();
  const setPronunciationVoice =
    useUserSettingsStore.use.setPronunciationVoice();

  const updateSelectedVoice = (newVoice: PronunciationVoice) => {
    setPronunciationVoice(newVoice);
  };

  return (
    <SettingCategory title="General" headerBgColor="var(--ion-color-primary)">
      <SettingRow>
        <Label labelText="Audio Voice" idOfControl="audio-voice-selector" />
        <Selector
          id="audio-voice-selector"
          value={pronunciationVoice as string}
          onValueChange={(updatedValue) =>
            updateSelectedVoice(updatedValue as PronunciationVoice)
          }
        >
          {AUDIO_VOICES.map((voiceOption: string) => {
            return (
              <SelectItem key={`voice_${voiceOption}`} value={voiceOption}>
                {voiceOption}
              </SelectItem>
            );
          })}
        </Selector>
      </SettingRow>
    </SettingCategory>
  );
}

export default GeneralSettings;
