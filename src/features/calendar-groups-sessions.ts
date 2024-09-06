import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { GroupSessionType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useCalendarGroupSession: CollectionFeatureHook<
  GroupSessionType,
  { studio_id?: string; trainee_id?: string; trainer_id?: string }
> = ({ studio_id, trainee_id, trainer_id }) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.EVENT.GET_ALL_GROUP_EVENTS_POST,
    body: { studio_id, trainee_id, trainer_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: GroupSessionType[] }, ApiError>(
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

export default useCalendarGroupSession

/**
 * Retrieve current global mutate key
 */
export const getGroupSessionMutateKey = () => swrKey
