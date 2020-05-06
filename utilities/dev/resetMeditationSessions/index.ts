import { asyncStorageMeditationSessionRepository } from "../../MeditationSessionRepository";

export const resetMeditationSessionRecords = async () => {
    await asyncStorageMeditationSessionRepository.clearMeditationSessions();
}

export default resetMeditationSessionRecords;