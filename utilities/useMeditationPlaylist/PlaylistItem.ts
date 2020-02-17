import { IPlaylistItem } from ".";

export class MeditationPlaylistItem implements IPlaylistItem {
    public uri: string;
    public name: string;
    public source: any;

    constructor(name: string, uri: string) {
        this.name = name;
        this.uri = uri;
        const source = {
            bell: require("./media/bell-ring.mp3"),
            silence: require("./media/sound-of-silence.mp3")
        };
        this.source = source[name];
    }
}

export const bell = new MeditationPlaylistItem("bell", "./media/bell-ring.mp3");
export const silence = new MeditationPlaylistItem("silence", "./media/sound-of-silence.mp3");