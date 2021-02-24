import { createContext, ReactNode, useState } from 'react';
import challenges from '../../challenges.json'

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;

}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    resetChallenge: () => void;
    startNewChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children }:ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0);
    const [challengesCompleted, setChallengesCompleted] = useState(0);

    const [activeChallenge, setActiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp() {
        setLevel(level + 1);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function startNewChallenge() {
        const randomClallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomClallengeIndex];
        setActiveChallenge(challenge);
    }

    return (
        <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, activeChallenge, experienceToNextLevel, levelUp, resetChallenge, startNewChallenge}}>
            {children}
        </ChallengesContext.Provider>
    )
}
