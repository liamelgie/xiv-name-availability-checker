import { useState } from 'react'
import styles from '../styles/SearchBar.module.css'

interface SearchBarProps {
    value: string,
    onChangeCallback: (value: string) => void;
  }

export default function SearchBar({value, onChangeCallback}: SearchBarProps) {
    return (
        <div className={styles.container}>
            <input
                type='text'
                value={value}
                className={styles.searchInput}
                onChange={(e) => {
                    onChangeCallback(e.target.value)    
                }}
                placeholder={'Character Name'}
            />
        </div>
    )
}