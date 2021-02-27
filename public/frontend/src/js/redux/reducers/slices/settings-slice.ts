import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {StorageHelper} from "#src/js/core/storage-helper";

export interface SettingsState {
  settings: SettingsList;
}

export interface SettingsList extends Record<string, boolean> {
  accordionAlwaysOpened: boolean,
  darkTheme: boolean
}

const settingsSlice = createSlice({
  name: `settings`,
  initialState: {
    settings: {
      accordionAlwaysOpened: false,
      darkTheme: false,
    }
  } as SettingsState,
  reducers: {
    settingsFromStorage: (state: SettingsState) => {
      if (StorageHelper.settings.list()) {
        state.settings = StorageHelper.settings.list().settings;
      }
    },
    setSettings: (state: SettingsState, action: PayloadAction<SettingsList>) => {
      state.settings = action.payload;
    },
  },
});

export const SettingsActions = {
  ...settingsSlice.actions,
};
export default settingsSlice.reducer;
