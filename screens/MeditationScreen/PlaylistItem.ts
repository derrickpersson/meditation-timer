export class PlaylistItem {
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

export const bell = new PlaylistItem("bell", "./media/bell-ring.mp3");
export const silence = new PlaylistItem("silence", "./media/sound-of-silence.mp3");

/* 

3 minutes
bell, 
silence * 160
bell,

*/