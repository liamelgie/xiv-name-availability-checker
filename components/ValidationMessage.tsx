import styles from '../styles/ValidationMessage.module.css'

interface ValidationMessageProps {
    isVisible: boolean,
    children: string
  }

export default function ValidationMessage({isVisible, children}: ValidationMessageProps) {
    return (
        <div className={styles.container}>
            {isVisible && 
            <span className={styles.message}>
                <div className={styles.warningIcon} >&#x26A0;</div>
                {children}
            </span>}
        </div>
    )
}