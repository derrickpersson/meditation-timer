
export enum Status {
    playing = "playing",
    stopped = "stopped",
    paused = "paused",
};

export interface Timer {
    status: Status;
    duration: number;
    currentPosition: number;
}

export interface ITimerService {
    play(duration: number): Timer;
    // start(duration: number): Timer;
    pause(): Timer;
    // stop(): Timer;
} 