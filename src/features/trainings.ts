import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { TrainingsTableType } from './api-types'

let swrKey: MongoSelector
const useTrainings: CollectionFeatureHook<TrainingsTableType> = () => {
  swrKey = {
    method: 'GET',
    from: '/',
    body: {},
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: TrainingsTableType[] }, ApiError>(
    swrKey,
    mongoSelector, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 }
  )

  return {
    isLoading,
    isValidating,
    error,
    size: 0,
    collection: (data && data?.data) || [],
  }
}

export default useTrainings
