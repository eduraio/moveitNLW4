import { createContext, ReactNode, useEffect, useState } from 'react';
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
    completeChallenge: () => void;
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

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    function levelUp() {
        setLevel(level + 1);
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if ( !activeChallenge ) return;

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if ( finalExperience >= experienceToNextLevel ) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function startNewChallenge() {

        const randomClallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomClallengeIndex];
        setActiveChallenge(challenge);

        new Audio('./notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: `Valendo ${challenge.amount} de XP`
            })
        }
    }

    return (
        <ChallengesContext.Provider value={{level, currentExperience, challengesCompleted, activeChallenge, experienceToNextLevel, levelUp, resetChallenge, startNewChallenge, completeChallenge}}>
            {children}
        </ChallengesContext.Provider>
    )
}
