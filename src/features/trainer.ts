import useSWR from 'swr'
import { ApiError, CollectionFeatureHook, SingleFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { TrainerTable } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useTrainerStudio: CollectionFeatureHook<TrainerTable, { studio_id: string | undefined }> = ({
  studio_id
}) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.INSTRUCTOR.GET_ALL_INSTRUCTORS,
    body: { studio_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: TrainerTable[] }, ApiError>(
    swrKey,
    mongoSelector, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 }
  )

  return {
    isLoading,
    isValidating,
    error,
    size: 0,
    collection: (data && data?.data) || []
  }
}

export default useTrainerStudio

/**
 * Retrieve current global mutate key
 */
export const getMutateKey = () => swrKey

// @ts-ignore
export const useSingleTrainerStudio: SingleFeatureHook<TrainerTable, { trainer_id?: string }> = ({
  trainer_id
}) => {
  swrKey = {
    method: 'GET',
    from: `${ENDPOINTS.INSTRUCTOR.GET_SINGLE_INSTRUCTOR_GET}/${trainer_id}`
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: TrainerTable }, ApiError>(
    swrKey,
    mongoSelector, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 }
  )
  console.log('DATA', data)

  return {
    isLoading,
    isValidating,
    error,
    size: 0,
    collection: (data && data?.data) || []
  }
}
