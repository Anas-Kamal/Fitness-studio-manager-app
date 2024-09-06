import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { PrivateSessionType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useEditPrivate: CollectionFeatureHook<
  PrivateSessionType,
  { studio_id: string | undefined }
> = ({ studio_id }) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.EVENT.EDIT_PRIVATE_SESSION_POST,
    body: { studio_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: PrivateSessionType[] }, ApiError>(
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

export default useEditPrivate

/**
 * Retrieve current global mutate key
 */
export const getEditPrivateSessionMutateKey = () => swrKey
