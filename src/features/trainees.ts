import useSWR from 'swr'
import { ApiError, CollectionFeatureHook, SingleFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { TraineesTable } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useTraineeStudio: CollectionFeatureHook<TraineesTable, { studio_id: string | undefined }> = ({
  studio_id
}) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.TRAINEE.GET_ALL_TRAINEE_POST,
    body: { studio_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: TraineesTable[] }, ApiError>(
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

export default useTraineeStudio

/**
 * Retrieve current global mutate key
 */
export const getTraineesMutationKey = () => swrKey

// @ts-ignore
export const useSingleTraineeStudio: SingleFeatureHook<TraineesTable, { trainee_id?: string }> = ({
  trainee_id
}) => {
  swrKey = {
    method: 'GET',
    from: `${ENDPOINTS.TRAINEE.GET_SINGLE_TRAINEE_GET}/${trainee_id}`
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: TraineesTable }, ApiError>(
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
