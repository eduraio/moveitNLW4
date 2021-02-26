import { useContext } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

export function Countdown() {

    const { minutes, seconds, hasFinishied, isActive, startCountdown, resetCountdown } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinishied ? (
                <button disabled className={styles.countdownButton}>
                    Ciclo encerrado
                    <img src='icons/twitter.svg' alt="Check" />
                </button>
            ) : (
                isActive ? (
                    <button type="button" onClick={resetCountdown} className={`${styles.countdownButton} ${styles.countdownButtonActive}`}>
                        Abandonar ciclo
                    </button>
                ) : (
                    <button type="button" onClick={startCountdown} className={`${styles.countdownButton} ${styles.countdownButtonInactive}`}>
                        Iniciar um ciclo
                    </button>
                )
            )}


        </div>
    )
}