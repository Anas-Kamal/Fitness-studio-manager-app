import useSWR from 'swr'
import { ApiError, CollectionFeatureHook, SingleFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { RoomModelType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useRooms: CollectionFeatureHook<RoomModelType, { studio_id: string | undefined }> = ({
  studio_id
}) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.ROOM.GET_ALL_ROOMS_POST,
    body: { studio_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: RoomModelType[] }, ApiError>(
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

export default useRooms

export const getMutateKey = () => swrKey

// @ts-ignore
export const useSingleRoom: SingleFeatureHook<RoomModelType, { room_id?: string }> = ({
  room_id
}) => {
  swrKey = {
    method: 'GET',
    from: `${ENDPOINTS.ROOM.GET_SINGLE_ROOM}/${room_id}`
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: RoomModelType }, ApiError>(
    swrKey,
    mongoSelector, { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 }
  )

  return {
    isLoading,
    isValidating,
    error,
    room: (data && data.data) || {}
  }
}
