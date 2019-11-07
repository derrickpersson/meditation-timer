import { meditationAnalysisService } from "../";
import moment from "moment";

Date.now = jest.fn(() => 1573098447360); // 2019-11-06;

const mockMeditationSessions = [
    {
        id: "someId",
        createdDate: moment('2019-11-03').toDate(),
        duration: 10,
    },
    {
        id: "someId",
        createdDate: moment('2019-11-04').toDate(),
        duration: 10,
    },
    {
        id: "someId",
        createdDate: moment('2019-11-05').toDate(),
        duration: 10,
    },
]

describe("meditationAnalysisService", () => {

    it("should return number of days in a row", () => {
        const streak = meditationAnalysisService.getDayStreakCount(mockMeditationSessions);
        expect(streak).toEqual(3);
    });

    it("shouldn't count meditation session on the same day towards the streak", () => {
        const additionalMockMeditationSessions = [
            ...mockMeditationSessions,
            {
                id: "someId",
                createdDate: moment('2019-11-03').toDate(),
                duration: 10,
            },
        ]

        const streak = meditationAnalysisService.getDayStreakCount(additionalMockMeditationSessions);
        expect(streak).toEqual(3);
    });

    it("should stop counting once the session streak is broken", () => {
        const additionalMockMeditationSessions = [
            ...mockMeditationSessions,
            {
                id: "someId",
                createdDate: moment('2019-10-30').toDate(),
                duration: 5,
            }
        ];
        const streak = meditationAnalysisService.getDayStreakCount(additionalMockMeditationSessions);
        expect(streak).toEqual(3);
    });

    it("should return 0 if no streaks within today and yesterday", () => {
        const additionalMockMeditationSessions = [];
        const streak = meditationAnalysisService.getDayStreakCount(additionalMockMeditationSessions);
        expect(streak).toEqual(0);
    });

    it("should return 1 if there is one session today", () => {
        const additionalMockMeditationSessions = [{
            id: "someId",
            createdDate: moment('2019-11-06').toDate(),
            duration: 15,
        }];
        const streak = meditationAnalysisService.getDayStreakCount(additionalMockMeditationSessions);
        expect(streak).toEqual(1);
    });
})