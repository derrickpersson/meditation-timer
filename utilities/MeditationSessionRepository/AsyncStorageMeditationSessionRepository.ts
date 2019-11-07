import { MeditationSessionRepository, MeditationRecords } from ".";
import { AsyncStorage } from 'react-native';
import { uuid } from "../uuid";

const meditationSessionsKey = "MEDITATION_SESSIONS";

export class AsyncStorageMeditationSessionRepository implements MeditationSessionRepository {
    public getMeditationSession(id: string) {
        return new Promise((resolve, reject) => AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
            if(error){
                reject(error);
            }
            if(result){
                const meditationSession = result.meditationSessions.find((session) => session.id === id);
                resolve(meditationSession);
            }
        }));
    }


    createMeditationSession(meditationSessionInput: MeditationSessionInput){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
                let meditationSessions;
                if(result){
                    const parsedResult = JSON.parse(result);
                    parsedResult.meditationSessions.push({
                        id: uuid.create(),
                        ...meditationSessionInput,
                    });
                    meditationSessions = JSON.stringify(parsedResult);
                } else {
                    meditationSessions = JSON.stringify({
                        meditationSessions: [{
                            id: uuid.create(),
                            ...meditationSessionInput,
                        }],
                    });
                }
                AsyncStorage.setItem(meditationSessionsKey, meditationSessions, (error) => {
                    if(error){
                        reject(error);
                    }
                    resolve();
                })
            });
        });
    }


    getMeditationSessions(limit?: number, sort?: SortBy): Promise<MeditationRecords>{
        return new Promise((resolve, reject) => AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
            if(error){
                reject(error);
            }
            resolve(JSON.parse(result));
        }));
    }
}

export default new AsyncStorageMeditationSessionRepository();