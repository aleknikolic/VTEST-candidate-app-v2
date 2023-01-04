export type InfractionType = "fullscreen" | "windowfocus";

export interface SecuritySettingsState {
    allowPause: boolean;
    fullscreen: boolean;
    photocheck: boolean;
    audioCheck: boolean;
    block: boolean;
}
