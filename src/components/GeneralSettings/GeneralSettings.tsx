import { SettingRow } from "../../styles/BaseStyledComponents";
import Label from "../Label";
import Selector, { SelectItem } from "../Selector";
import { AUDIO_VOICES } from "../../constants";
import { useState } from "react";
import Card from "../Card";
import styled from "styled-components";

const SettingCategory = styled(Card)`
  display: flex;
`;

function GeneralSettings() {
  const [selectedVoice, setSelectedVoice] = useState(AUDIO_VOICES[0]);

  return (
    <SettingCategory title="General" headerBgColor="var(--ion-color-primary)">
      <SettingRow>
        <Label labelText="Audio Voice" idOfControl="audio-voice-selector" />
        <Selector
          id="audio-voice-selector"
          value={selectedVoice}
          onValueChange={(updatedValue) => setSelectedVoice(updatedValue)}
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
