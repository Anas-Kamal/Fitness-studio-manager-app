import { REACT_APP_PUBLIC_MONGO_URL } from '../lib/constants'

export type CollectionResponse<T> = [T[], number]
interface Generics {
  anon?: boolean
}
export interface MongoSelector extends Generics {
  from?: string
  method: 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH'
  body?: any
  select?: string[]
  filter?: {
    [key in string]: string[]
  }
  order?: string[]
  pagination?: {
    limit: number
    skip: number
  }
}
export interface MongoMutator extends Omit<MongoSelector, 'select' | 'pagination' | 'order'> {
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  select?: 'id' | string[]
  resolution?: 'merge-duplicates' | 'ignore-duplicates'
  onConflict?: string
}

interface MongoSelectorReturn<T = unknown> {
  data: T
  status: boolean
  error: string | { message: string; code?: string | undefined }
}
export const mongoSelector = async <T,>({
  from,
  method,
  order,
  filter,
  body,
}: MongoSelector): Promise<MongoSelectorReturn<T>> => {
  let error
  if (!from) {
    throw new Error('`from` is required')
  }
  const url = new URL(`${REACT_APP_PUBLIC_MONGO_URL}${from}`)
  if (order) {
    const orderQuery = order.join(',')
    url.searchParams.set('order', orderQuery)
  }
  // Prepare filtering
  if (filter) {
    const entries = Object.entries(filter)
    entries.forEach(([filterKey, value]) => {
      const isWrapped = ['or'].includes(filterKey)
      const formattedValue = value.join(',')
      url.searchParams.set(filterKey, isWrapped ? `(${formattedValue})` : formattedValue)
    })
  }

  const token = localStorage.getItem('token')

  const headers = new Headers({
    'Access-Control-Request-Headers': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  })

  const response = await fetch(url, {
    method: method.toLocaleUpperCase(),
    headers,
    body: JSON.stringify(body),
  })

  const responseBody = await response.json()

  if (!response.ok) {
    const err = (await response.json()) as { message: string; code?: string }

    throw new Error(err.message)
  }

  return { data: responseBody, status: response.ok, error: error || '' }
}
export const mongoMutator = async ({ from }: MongoMutator) => {
  if (!from) {
    throw new Error('`from` is required')
  }
}
