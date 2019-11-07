import { MeditationSession } from "../MeditationSessionRepository";
import moment from "moment";

export class MeditationAnalysisService {
    public getTotalMeditatedMinutes(meditationSessions: MeditationSession[]){
        return meditationSessions.reduce(this.sumDuration, 0);
    }

    public getWeeklyMeditatedMinutes(meditationSessions: MeditationSession[]){
        return meditationSessions.filter((session) => {
            const lastSunday = moment().day(0).startOf('day');
            return moment(session.createdDate).isSameOrAfter(lastSunday);
        }).reduce(this.sumDuration, 0);
    }

    public getDayStreakCount(meditationSessions: MeditationSession[]) {
        const result = meditationSessions.sort((meditationSession1, meditationSession2) => {
            if(moment(meditationSession1.createdDate).isBefore(meditationSession2.createdDate)){
                return 1;
            } else {
                return -1;
            }
        }).reduce((result, session) => {
            if(result.stopCount){
                return result;
            }

            const YESTERDAY = moment().subtract(1, 'day');

            if(!result.lastSession && moment(session.createdDate).isSameOrAfter(YESTERDAY, 'day')){
                result.total++;
                result.lastSession = session;
                return result;
            }

            if(moment(session.createdDate).isSame(moment(result.lastSession.createdDate), 'day')){
                result.lastSession = session;
                return result;
            }

            if(moment(session.createdDate).isSameOrAfter(moment(result.lastSession.createdDate).subtract(1, 'day'), 'day')){
                result.total++;
                result.lastSession = session;
                return result;
            }

            return {
                total: result.total,
                lastSession: result.lastSession,
                stopCount: true,
            };

        }, {
            total: 0,
            lastSession: null,
            stopCount: false,
        });
        return result && result.total || 0;
    };

    private sumDuration = (result, meditationSession) => {
        return result = result + meditationSession.duration;
    }
}

export default new MeditationAnalysisService();