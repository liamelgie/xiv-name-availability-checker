import { Response } from 'cross-fetch'
import useSWR, { Key, Fetcher } from 'swr'

export default function useAvailability ({
    dcWorldName,
    name,
    datacenter = false
}: {
    dcWorldName: string,
    name: string
    datacenter?: boolean
}) {
    const apiURL = datacenter ? `/api/dc/${dcWorldName}/${name}` : `/api/world/${dcWorldName}/${name}`
    const { data, error } = useSWR(name ? [dcWorldName, name] : null, (world: string, name: string) => fetch(apiURL).then(async (res) => await res.json()))
    return {
        availability: data,
        isLoading: !error && !data,
        isError: error
    }
  }