import { MeditationSessionRepository, MeditationRecords, MeditationSession, MeditationSessionInput, SortBy } from ".";
import { AsyncStorage } from 'react-native';
import { uuid } from "../uuid";

const meditationSessionsKey = "MEDITATION_SESSIONS";

export class AsyncStorageMeditationSessionRepository implements MeditationSessionRepository {
    public getMeditationSession(id: string): Promise<MeditationRecords> {
        return new Promise((resolve, reject) => AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
            if(error){
                reject(error);
            }
            if(result){
                try {
                    const parsedResult = JSON.parse(result);
                    const meditationSession: MeditationSession = parsedResult.meditationSessions.find((session: MeditationSession) => session.id === id);
                    resolve({
                        meditationSessions: [meditationSession]
                    });
                } catch (error){
                    reject(error);
                }
            }
        }));
    }


    public createMeditationSession(meditationSessionInput: MeditationSessionInput): Promise<void>{
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
                let meditationSessions;
                if(result){
                    const parsedResult = JSON.parse(result);
                    parsedResult.meditationSessions.push({
                        id: uuid.create(0),
                        ...meditationSessionInput,
                    });
                    meditationSessions = JSON.stringify(parsedResult);
                } else {
                    meditationSessions = JSON.stringify({
                        meditationSessions: [{
                            id: uuid.create(0),
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


    public getMeditationSessions(limit?: number, sort?: SortBy): Promise<MeditationRecords>{
        return new Promise((resolve, reject) => AsyncStorage.getItem(meditationSessionsKey, (error, result) => {
            if(error){
                reject(error);
            }

            if(result){
                try {
                    const parsedResult = JSON.parse(result);
                    resolve(parsedResult);
                } catch (error){
                    reject(error);
                }    
            }

            resolve({
                meditationSessions: []
            });
        }));
    }
}

export default new AsyncStorageMeditationSessionRepository();