import styles from '../styles/Result.module.css'
import { SpinnerRoundFilled } from 'spinners-react';

export default function Result ({
    world,
    availability,
    isLoading,
    isValid,
    lodestoneID
}: {
    world: string,
    availability: boolean,
    isLoading: boolean,
    isValid: boolean,
    lodestoneID?: string
}) {
    return (
        <div className={styles.container}>
            <div className={styles.symbol}>
                { !isValid ? <span className={styles.question}>&#63;</span>
                    : isLoading ? <SpinnerRoundFilled size={15} thickness={100} speed={100} color="rgba(255, 191, 0, 1)" />
                    : availability
                        ? <span className={styles.cross}>&#10007;</span>
                        : <span className={styles.tick}>&#10003;</span>
                }</div>
            <span className={styles.world}>
                {lodestoneID 
                    ? <a target='_blank' href={`https://eu.finalfantasyxiv.com/lodestone/character/${lodestoneID}`}>{world}</a>
                    : `${world}`
                }
            </span>
        </div>
    )
}