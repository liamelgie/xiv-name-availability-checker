import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SearchBar from '../components/SearchBar'
import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import DataCenter from '../components/DataCenter'

const Home: NextPage = () => {
  const [ searchValue, setSearchValue ] = useState('')
  const [ isEmpty, setIsEmpty] = useState(true)
  const updateSearchValue = (newValue: string) => {
    setSearchValue(newValue)
    if (newValue.length > 0) {
      setIsEmpty(false) 
    } else {
      setIsEmpty(true)
    }
  }
  const debouncedSearchValue = useDebounce(searchValue, 300)
  return (
    <div className={styles.container}>
      <Head>
        <title>XIV Name Availibility Checker</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div className={styles.headerContainer}>
          <div className={styles.headerWrapper}>
            <h1>XIV Name Availibility Checker</h1>
            <SearchBar value={searchValue} onChangeCallback={updateSearchValue} />
          </div>
        </div>
      </header>
      <main className={styles.main}>
      <div className={styles.resultContainer}>
          <div className={`${styles.regionContainer} ${styles.regionMedium}`}>
            <h2>Europe</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Chaos'} name={debouncedSearchValue} isEmpty={isEmpty} />
              <DataCenter datacenter={'Light'} name={debouncedSearchValue} isEmpty={isEmpty} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionLarge}`}>
            <h2>North America</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Aether'} name={debouncedSearchValue} isEmpty={isEmpty} />
              <DataCenter datacenter={'Crystal'} name={debouncedSearchValue} isEmpty={isEmpty} />
              <DataCenter datacenter={'Primal'} name={debouncedSearchValue} isEmpty={isEmpty} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionSmall}`}>
            <h2>Oceania</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Materia'} name={debouncedSearchValue} isEmpty={isEmpty} />
            </div>
          </div>
          <div className={`${styles.regionContainer} ${styles.regionLarge}`}>
            <h2>Japan</h2>
            <div className={styles.dataCenterWrapper}>
              <DataCenter datacenter={'Elemental'} name={debouncedSearchValue} isEmpty={isEmpty} />
              <DataCenter datacenter={'Gaia'} name={debouncedSearchValue} isEmpty={isEmpty} />
              <DataCenter datacenter={'Mana'} name={debouncedSearchValue} isEmpty={isEmpty} />
              {/* <DataCenter datacenter={'Meteor'} name={debouncedSearchValue} isEmpty={isEmpty} /> */}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Built by <a href={'https://github.com/liamelgie'}>Liam Elgie</a> - <a href={'https://eu.finalfantasyxiv.com/lodestone/character/35644156/'}>Cinnamon Swirl (Cerberus)</a></span>
      </footer>
    </div>
  )
}

export default Home
