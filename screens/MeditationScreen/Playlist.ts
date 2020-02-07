import { PlaylistItem, bell, silence } from "./PlaylistItem";

export interface PlaylistInstruction {
    playlistItem: PlaylistItem;
    loopCount: number;
}

export class Playlist {
    public playlistItems: PlaylistInstruction[] = [];
    private bell: PlaylistItem = bell;
    private silence: PlaylistItem = silence;
    private index: number = 0;
    

    public constructor(duration: number){
        const durationInSeconds = duration * 60;
        const durationOfSilence = durationInSeconds - 20;

        this.playlistItems.push({
            playlistItem: this.bell,
            loopCount: 0,
        });
        this.playlistItems.push({
            playlistItem: this.silence,
            // loopCount: durationOfSilence,
            loopCount: 2,
        });
        this.playlistItems.push({
            playlistItem: this.bell,
            loopCount: 0,
        });
    }

    public elapsedTimeInMS(index){
        
    }

    public playnext() {
        this.index = this.index + 1;
    }
}