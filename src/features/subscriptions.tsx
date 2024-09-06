
import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { SubscriptionType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useSubscriptions: CollectionFeatureHook<SubscriptionType, { studio_id: string | undefined }> = ({
  studio_id,
}) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.EVENT.GET_ALL_SUBSCRIPTIONS_POST,
    body: { studio_id },
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: SubscriptionType[] }, ApiError>(swrKey, mongoSelector, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 })

  return {
    isLoading,
    isValidating,
    error,
    size: 0,
    collection: (data && data?.data) || [],
  }
}

export default useSubscriptions

export const getSubscriptionsMutateKey = () => swrKey
