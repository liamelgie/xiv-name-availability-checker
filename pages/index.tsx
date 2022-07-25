import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'
import ValidationMessage from '../components/ValidationMessage'
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import DataCenter from '../components/DataCenter'
import useDetectDarkMode from '../hooks/useDetectDarkMode'

const Home: NextPage = () => {
  const [ searchValue, setSearchValue ] = useState('')
  const [ isEmpty, setIsEmpty ] = useState(true)
  const [ isValid, setIsValid ] = useState(false)
  const [ validationString, setValidationString ] = useState('')

  const [ theme, setTheme ] = useState('light')
  const onSelectTheme = (theme: string) => {
    setTheme(theme)
    if (theme === 'dark')
      document.body.classList.add('dark-mode')
    else
      document.body.classList.remove('dark-mode')
  }
  useDetectDarkMode(onSelectTheme)

  const validateUserInput = (input: string) => {
    if (input.length > 20 || input.split(' ').filter(word => word !== '').length !== 2 || !/^[a-zA-Z']{2,}\s[a-zA-Z']{2,}$/.test(input)) {
      return false
    } else {
      return true
    }
  }
  const updateSearchValue = (newValue: string) => {
    setSearchValue(newValue)
    if (newValue.length > 0) {
      setIsEmpty(false)
      if (validateUserInput(newValue)) {
        setIsValid(true)
      } else {
        setIsValid(false)
        if (newValue.split(' ')[0]) {
          if (newValue.split(' ')[0].length < 2) setValidationString('Your first and last name must be at least 2 characters long.')
        }
        if (newValue.split(' ')[1]) {
          if (newValue.split(' ')[1].length < 2) setValidationString('Your first and last name must be at least 2 characters long.')
        }
        if (newValue.length > 20) setValidationString('Your character name cannot be more than 20 characters long.')
        if (newValue.split(' ').filter(word => word !== '').length !== 2)  setValidationString('Your character name must contain a first and last name.')
        if (/[-!$%^&*()_+|~=`{}\[\]:";<>?,.\/0-9]/g.test(newValue)) setValidationString('Your character name must only contain letters and apostrophes.')
      }
    } else {
      setIsValid(false)
      setIsEmpty(true)
    }
  }
  const debouncedSearchValue = useDebounce(searchValue, 300)
  return (
    <div className={styles.container}>
      <Head>
        <title>XIV Name Availability Checker</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="Check character name availability across every world in seconds." />
        <meta name='robots' content='nofollow' />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.headerWrapper}>
            <h1>XIV Name Availability Checker</h1>
            <SearchBar value={searchValue} onChangeCallback={updateSearchValue} />
            <ValidationMessage isVisible={!isValid && !isEmpty}>
              {validationString}
            </ValidationMessage>
          </div>
        </div>
      </header>
      <main className={styles.main}>
      <div className={styles.resultContainer}>
          <div className={`${styles.regionContainer} ${styles.regionMedium}`}>
            <h2>Europe</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Chaos'} name={debouncedSearchValue} isValid={isValid} />
              <DataCenter datacenter={'Light'} name={debouncedSearchValue} isValid={isValid} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionLarge}`}>
            <h2>North America</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Aether'} name={debouncedSearchValue} isValid={isValid} />
              <DataCenter datacenter={'Crystal'} name={debouncedSearchValue} isValid={isValid} />
              <DataCenter datacenter={'Primal'} name={debouncedSearchValue} isValid={isValid} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionSmall}`}>
            <h2>Oceania</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Materia'} name={debouncedSearchValue} isValid={isValid} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionLarge}`}>
            <h2>Japan</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Elemental'} name={debouncedSearchValue} isValid={isValid} />
              <DataCenter datacenter={'Gaia'} name={debouncedSearchValue} isValid={isValid} />
              <DataCenter datacenter={'Mana'} name={debouncedSearchValue} isValid={isValid} />
              {/* <DataCenter datacenter={'Meteor'} name={debouncedSearchValue} isValid={isValid} /> */}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Built by <a target={'_blank'} rel="noreferrer" href={'https://github.com/liamelgie'}>Liam Elgie</a> - <a target={'_blank'} rel="noreferrer" href={'https://eu.finalfantasyxiv.com/lodestone/character/35644156/'}>Cinnamon Swirl (Cerberus)</a></span>
      </footer>
    </div>
  )
}

export default Home
