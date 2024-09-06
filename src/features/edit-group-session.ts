import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { GroupSessionType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useEditGroup: CollectionFeatureHook<GroupSessionType, { studio_id: string | undefined }> = ({
  studio_id
}) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.EVENT.EDIT_GROUP_SESSION_POST,
    body: { studio_id }
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

export default useEditGroup

export const getEditGroupSessionMutateKey = () => swrKey
