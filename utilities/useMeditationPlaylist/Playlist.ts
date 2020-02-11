import { bell, silence } from "./PlaylistItem";
import { IPlaylist, IPlaylistItem, Interval } from ".";

export interface PlayerInstruction {
    playlistItem: IPlaylistItem;
    loopCount: number;
}

export class MeditationPlaylist implements IPlaylist {
    private playerInstructions: PlayerInstruction[] = [];
    private bell: IPlaylistItem = bell;
    private silence: IPlaylistItem = silence;

    public constructor(duration: number, interval?: Interval){
        const durationInSeconds = duration * 60;
        const durationOfSilence = (durationInSeconds - 20);

        this.playerInstructions.push({
            playlistItem: this.bell,
            loopCount: 0,
        });
        this.playerInstructions.push({
            playlistItem: this.silence,
            loopCount: durationOfSilence,
            // loopCount: 2,
        });
        this.playerInstructions.push({
            playlistItem: this.bell,
            loopCount: 0,
        });
    }

    public getPlaylistItemInstruction(index){
        if(index <= this.playerInstructions.length - 1){
            return this.playerInstructions[index];
        } else {
            throw new Error("Outside of playlist range");
        }
    }

    public getPlaylistLength() {
        return this.playerInstructions.length;
    }
}

export default MeditationPlaylist;