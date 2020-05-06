import { asyncStorageMeditationSessionRepository } from "../../MeditationSessionRepository";

export const insertMassMeditationSessionRecordsForPerformanceReasons = async (num) => {
    for(let i = 0; i <= num; i++){
        await asyncStorageMeditationSessionRepository.createMeditationSession({
            duration: 10,
            intention: "balance",
            createdDate: new Date(),
        });
    }
}

export default insertMassMeditationSessionRecordsForPerformanceReasons;