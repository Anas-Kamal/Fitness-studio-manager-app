export interface ApiError {
  message: string
}

interface FeatureResult {
  isLoading: boolean
  isValidating: boolean
  error?: ApiError
}

interface CollectionFeatureResult<C> extends FeatureResult {
  collection: C[]
  size: number
}
interface SingleFeatureResult<C> extends FeatureResult {
  collection: C
  size: number
}

export interface PaginationProps {
  page?: number
  limit?: number
}

export interface OrderProps {
  order?: string[]
}

export type CollectionFeatureHook<Item, Props = unknown, ExtendResult = unknown> = (
  props: Props,
) => Readonly<CollectionFeatureResult<Item> & ExtendResult>

export type SingleFeatureHook<Item, Props = unknown, ExtendResult = unknown> = (
  props: Props,
) => Readonly<SingleFeatureResult<Item> & ExtendResult & Props>

export type FeatureHook<Props, ExtendResult = unknown> = (props: Props) => Readonly<FeatureResult & ExtendResult>
