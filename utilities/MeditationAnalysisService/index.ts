export interface MeditationAnalysisService {
    getTotalMeditatedMinutes: (meditationSessions) => number;
    getWeeklyMeditatedMinutes: (meditationSessions) => number;
    getDayStreakCount: (meditationSessions) => number;
}

export { default as meditationAnalysisService } from "./MeditationAnalysisService";