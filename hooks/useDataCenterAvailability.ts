import useSWR from 'swr'

export default function useDataCenterAvailability (datacenter: string, name: string) {
    const { data, error } = useSWR(name ? [datacenter, name] : null, (datacenter: string, name: string) => fetch(`/api/dc/${datacenter}/${name}`).then(async (res) => await res.json()))
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
  }