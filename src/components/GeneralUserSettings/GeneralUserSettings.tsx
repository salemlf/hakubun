import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
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

// TODO: add disclaimer about kyoto accent not always being available for vocab
function GeneralUserSettings() {
  const { pronunciationVoice, setPronunciationVoice } =
    useUserSettingsStoreFacade();
  const voiceID = pronunciationVoice.id;

  const updateSelectedVoice = (newVoiceID: string) => {
    let newVoice = AUDIO_VOICES.find((voice) => voice.id === newVoiceID)!;
    setPronunciationVoice(newVoice);
  };

  return (
    <SettingCategory
      title="General"
      headerBgColor="var(--ion-color-secondary)"
      headerTextColor="white"
    >
      <SettingRow>
        <Label labelText="Audio Voice" idOfControl="audio-voice-selector" />
        <Selector
          id="audio-voice-selector"
          value={voiceID}
          onValueChange={(updatedValue) => updateSelectedVoice(updatedValue)}
        >
          {AUDIO_VOICES.map((voiceOption: PronunciationVoice) => {
            return (
              <SelectItem
                key={`voice_${voiceOption.id}`}
                value={voiceOption.id}
              >
                {voiceOption.displayName}
              </SelectItem>
            );
          })}
        </Selector>
      </SettingRow>
    </SettingCategory>
  );
}

export default GeneralUserSettings;
