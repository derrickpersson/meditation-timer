import { ITimerService, Status, Timer } from ".";

export class TimerService implements ITimerService {
    public instance: Timer = {
        status: Status.stopped,
        duration: 0,
        currentPosition: 0,
    };

    private interval;

    public play(millisecondDuration: number) {
        if(this.instance.status !== Status.playing){
            this.instance = {
                ...this.instance,
                status: Status.playing,
                duration: millisecondDuration,
                currentPosition: this.instance.currentPosition || 0,
            }

            const start = Date.now();

            this.interval = setInterval(() => {
                const delta = Date.now() - start;
                if(this.instance.currentPosition + delta <= this.instance.duration){
                    this.instance = {
                        ...this.instance,
                        currentPosition: this.instance.currentPosition + delta,
                    };
                } else {
                    this.instance = {
                        ...this.instance,
                        status: Status.stopped,
                    }
                    clearInterval(this.interval);
                }

            }, 100);
            return this.instance;
        }
    }

    public pause() {
        this.instance = {
            ...this.instance,
            status: Status.paused,
        };

        clearInterval(this.interval);
        
        return this.instance;
    }
}

export default TimerService;