import { AsyncStorage } from "react-native";

export type themeType = "light" | "dark";

export interface ITheme {
    type: themeType;
}

export interface IThemeRepository {
    getTheme: () => Promise<themeType>;
    setTheme: (type: themeType) => Promise<void>;
}

export class AsyncStorageThemeRepository implements IThemeRepository {
    private themeRespositoryKey = "THEME_TYPE";

    getTheme: () => Promise<themeType> = () => {
        return new Promise((resolve, reject) => AsyncStorage.getItem(this.themeRespositoryKey, (error, result) => {
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

    setTheme: (themeType: themeType) => Promise<void> = (themeType: themeType) => {
        const stringifiedThemeType = JSON.stringify(themeType);
        return new Promise((resolve, reject) => AsyncStorage.setItem(this.themeRespositoryKey, stringifiedThemeType, (error) => {
            if(error){
                reject(error);
            }
            resolve();
        }));
    }
}

export default new AsyncStorageThemeRepository();