export default class muteManager {
    private static _instance?;
    static get Instance(): muteManager;
    private constructor();
    private _bMuted;
    get isMuted(): boolean;
    set isMuted(toggle: boolean);
    toggleMuted(): boolean;
    setMuted(toggle: boolean): boolean;
}
