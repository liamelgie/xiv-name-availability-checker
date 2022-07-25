import useSWR from 'swr'

export default function useWorldAvailability (world: string, name: string) {
    const { data, error } = useSWR(name ? [world, name] : null, (world: string, name: string) => fetch(`/api/world/${world}/${name}`).then(async (res) => await res.json()))
    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
  }