import useUserSettingsStoreFacade from "../../stores/useUserSettingsStore/useUserSettingsStore.facade";
import { useTheme } from "../../contexts/ThemeContext";
import { AUDIO_VOICES } from "../../constants";
import { PronunciationVoice } from "../../types/UserSettingsTypes";
import Label from "../Label";
import Card from "../Card";
import Selector, { SelectItem } from "../Selector";
import ColorThemeSwitch from "../ColorThemeSwitch";
import { SettingRow } from "../../styles/BaseStyledComponents";

// TODO: add disclaimer about kyoto accent not always being available for vocab
function GeneralUserSettings() {
  const { pronunciationVoice, setPronunciationVoice, setPrefersDarkModeTheme } =
    useUserSettingsStoreFacade();
  const { isDarkMode, setIsDarkMode } = useTheme();
  const voiceID = pronunciationVoice.id;

  const updateSelectedVoice = (newVoiceID: string) => {
    let newVoice = AUDIO_VOICES.find((voice) => voice.id === newVoiceID)!;
    setPronunciationVoice(newVoice);
  };

  const setIsDarkModeOn = (isDarkMode: boolean) => {
    setPrefersDarkModeTheme(isDarkMode);
    setIsDarkMode(isDarkMode);
  };

  return (
    <Card
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
      <SettingRow>
        <Label labelText="Color Theme" idOfControl="color-theme-switch" />
        <ColorThemeSwitch
          isSwitchedOn={isDarkMode}
          setIsSwitchedOn={setIsDarkModeOn}
          labelId="color-theme-switch"
        />
      </SettingRow>
    </Card>
  );
}

export default GeneralUserSettings;
