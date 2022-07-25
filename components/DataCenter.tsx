import useDataCenterAvailability from '../hooks/useDataCenterAvailability'
import styles from '../styles/DataCenter.module.css'
import Result from './Result'
import worlds from '../public/worlds.json'

export default function DataCenter ({
    datacenter,
    name,
    isValid
}: {
    datacenter: string
    name: string,
    isValid: boolean
}) {
    const { data, isLoading, isError } = useDataCenterAvailability(datacenter, name)
    const results = worlds[datacenter].map((world: string) => {
        return <Result 
            key={world} 
            world={world} 
            availability={data ? data[datacenter][world] : true} 
            isLoading={isLoading} 
            isValid={isValid} 
        />
    })
    return (
        <div className={styles.container}>
            <h3>{datacenter}</h3>
            {results}
        </div>
    )
}