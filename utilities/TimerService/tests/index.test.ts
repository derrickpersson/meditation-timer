import TimerService from "../TimerService";
import { Status } from "..";

describe("TimerService", () => {
    let timerService;
    beforeEach(() => {
        timerService = new TimerService();
    });

    it("should set a timer for set amount of time", () => {
        const timer = timerService.play(10000);
        expect(timer).toEqual({
            status: Status.playing,
            duration: 10000,
            currentPosition: 0,
        });
    });

    it("should stop playing after the duration", () => {
        timerService.play(5000);
        console.log("Instance: ", timerService.instance);

        setTimeout(() => {
            expect(timerService.instance.status).toEqual(Status.stopped);
        }, 1500);
    });
});