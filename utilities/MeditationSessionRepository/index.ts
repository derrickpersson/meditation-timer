export interface MeditationSessionInput {
    duration: number;
    createdDate: Date;
}

export interface MeditationSession {
    id: string;
    duration: number;
    createdDate: Date;
}

export type ASC = "asc";
export type DESC = "desc";
export type SortBy = ASC | DESC;

export interface MeditationRecords {
    meditationSessions: MeditationSession[];
}

export interface MeditationSessionRepository {
    getMeditationSession: (id: string) => Promise<MeditationRecords>;
    createMeditationSession: (meditationSessionInput: MeditationSessionInput) => Promise<void>;
    getMeditationSessions: (limit?: number, sort?: SortBy) => Promise<MeditationRecords>;
}

export { default as asyncStorageMeditationSessionRepository } from "./AsyncStorageMeditationSessionRepository";