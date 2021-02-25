import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinishied: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }:CountdownProviderProps ) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setisActive] = useState(false);
    const [ hasFinishied, sethasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setisActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout)
        setisActive(false);
        setTime(0.1 * 60);
        sethasFinished(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout =  setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if ( isActive && time === 0) {
            sethasFinished(true);
            setisActive(false);
            startNewChallenge();
        }
    }, [isActive, time])


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds, 
            hasFinishied,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}