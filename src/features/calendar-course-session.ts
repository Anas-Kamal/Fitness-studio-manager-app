import useSWR from 'swr'
import { ApiError, CollectionFeatureHook } from './types'
import { MongoSelector, mongoSelector } from './fetchers'
import { CourseType } from './api-types'
import ENDPOINTS from './endpoints'

let swrKey: MongoSelector
const useCalendarCourseSession: CollectionFeatureHook<
  CourseType,
  { studio_id: string | undefined }
> = ({ studio_id }) => {
  swrKey = {
    method: 'POST',
    from: ENDPOINTS.EVENT.GET_ALL_COURSE_EVENTS_POST,
    body: { studio_id }
  }
  const { data, error, isLoading, isValidating } = useSWR<{ data: CourseType[] }, ApiError>(
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

export default useCalendarCourseSession

/**
 * Retrieve current global mutate key
 */
export const getMutateKey = () => swrKey
