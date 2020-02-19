import { AsyncStorage } from "react-native";

export type isHidden = boolean;

export interface IStatsPresenterRepository {
    getPresenterStatus: () => Promise<isHidden>;
    setPresenterStatus: (isHidden: boolean) => Promise<void>;
}

export class AsyncStorageMeditationStatsPresenterRepository implements IStatsPresenterRepository {
    private statsPresenterRepositoryKey = "IS_STATS_HIDDEN";

    getPresenterStatus: () => Promise<isHidden> = () => {
        return new Promise((resolve, reject) => AsyncStorage.getItem(this.statsPresenterRepositoryKey, (error, result) => {
            if(error){
                reject(error);
            }
            if(result){
                try {
                    const parsedResult = JSON.parse(result);
                    resolve(parsedResult);
                } catch (err){
                    reject(err);
                }
            }
        }));
    }

    setPresenterStatus: (isHidden: boolean) => Promise<void> = (isHidden: boolean) => {
        const stringifiedIsHidden = JSON.stringify(isHidden);
        return new Promise((resolve, reject) => AsyncStorage.setItem(this.statsPresenterRepositoryKey, stringifiedIsHidden, (error) => {
            if(error){
                reject(error);
            }
            resolve();
        }));
    }
}

export default new AsyncStorageMeditationStatsPresenterRepository();