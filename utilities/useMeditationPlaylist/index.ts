import { PlayerInstruction } from "./Playlist";

export interface Interval {
    timeBetween: number;
}

export interface IPlaylistItem {
    uri: string;
    name: string;
    source: any;
}

export interface IPlaylist {
    getPlaylistItemInstruction: (index) => PlayerInstruction;
    getPlaylistLength: () => number;
}

export { default as useMeditationPlaylistPlayer } from "./useMeditationPlaylistPlayer";