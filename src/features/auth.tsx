import * as React from 'react'
import useSWR from 'swr'
import { ApiError } from './types'
import { mongoSelector } from './fetchers'
import type { Profile } from './api-types'
import ENDPOINTS from './endpoints'

type ViewState = 'studio' | 'trainer' | null

interface ContextProps {
  isValidating: boolean
  profile?: Profile | Record<string, any>
  isAuthenticated: boolean
  error?: string | null
  view: ViewState
  token: string | null
  isLoading: boolean
  OTP: string | null
  logOut: () => Promise<void>
  loginWithPhone: (phone: string) => Promise<any>
  loginWithOtp: (phone: string, otp: string) => Promise<any>
  loginWithRegistraionOtp: (phone: string, otp: string) => Promise<any>
  loadUserProfile: () => Promise<any>
  sellerKeyCheck: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

// eslint-disable-next-line no-underscore-dangle
const _noop = async () => {
  throw new Error('Not loaded')
}
// type profileTypes =  {
//  seller?: {
//     user?: string; // Optional field
//     __v?: number;  // Optional field
//     _id?: string;  // Optional field
//   };

// }
const Context = React.createContext<ContextProps>({
  isValidating: false,
  isAuthenticated: false,
  view: null,
  token: null,
  profile: {},
  error: null,
  isLoading: false,
  OTP: null,
  loadUserProfile: _noop,
  loginWithOtp: _noop,
  loginWithPhone: _noop,
  loginWithRegistraionOtp: _noop,
  logOut: _noop,
  sellerKeyCheck: _noop
})

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [OTP, setOTP] = React.useState<string | null>(null)
  const [profile, setProfile] = React.useState({})
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [view, setView] = React.useState<ViewState>(null)
  const [token, setToken] = React.useState<string | null>(null)
  // const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const {
    data,
    error: globalError,
    isValidating,
    isLoading
  } = useSWR<any & { status: number }, ApiError>(
    token
      ? { method: 'POST', from: ENDPOINTS.AUTH.VERIFY_ACCOUNT_POST, body: { accessToken: token } }
      : null,
    mongoSelector,
    { revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false, errorRetryCount:1 }
  )

  // Taking the token from localstorage between the request is sent to verify the session
  React.useEffect(() => {
    const localToken = localStorage.getItem('token') || null

    if (!localToken) {
      return
    }
    setToken(localToken)
    //navbar state persist
    const viewType = localStorage.getItem('type')
    if (!viewType) return
    setView(viewType as ViewState)
  }, [])

  const loginWithPhone = async (phone: string) => {
    try {
      const { data }: any = await mongoSelector({
        from: ENDPOINTS.AUTH.LOGIN_WITH_PHONE_POST,
        body: {
          phone
        },
        method: 'POST'
      })
      if (data.OTP) {
        console.log('OTP', data.OTP)
        setOTP(data.OTP)
      }
      // if (status) return true

      // return true
    } catch (err) {
      throw new Error((err as ApiError).message)
    }
  }

  const loginWithOtp = async (phone: string, incomingOtp: string) => {
    try {
      const { data: otpData, status } = await mongoSelector<{
        accessToken: string
        is_registered: boolean
      }>({
        from: ENDPOINTS.AUTH.LOGIN_WITH_PHONE_AND_OTP_POST,
        body: {
          phone,
          otp: incomingOtp
        },
        method: 'POST'
      })
      if (!otpData?.is_registered) return false

      if (status) {
        localStorage.setItem('token', otpData.accessToken)
        setToken(otpData.accessToken)
        setIsAuthenticated(true)
      }
      return false
    } catch (err) {
      throw new Error((err as ApiError).message)
    }
  }
  const loginWithRegistraionOtp = async (phone: string, incomingOtp: string) => {
    try {
      const { status } = await mongoSelector({
        from: ENDPOINTS.AUTH.LOGIN_WITH_PHONE_AND_OTP_POST,
        body: {
          phone,
          otp: incomingOtp
        },
        method: 'POST'
      })

      if (status) return true

      return false
    } catch (err) {
      throw new Error((err as ApiError).message)
    }
  }

  const loadUserProfile = async () => {
    const { data: userData, status } = await mongoSelector<Profile>({
      from: ENDPOINTS.AUTH.LOAD_PROFILE_POST,
      method: 'POST',
      body: { accessToken: token }
    })
    if (!status) return
    if (userData) {
      console.log('LOADING USER PROFILE')
      if (typeof userData?.type !== 'undefined' || userData?.type !== 'undefined') {
        localStorage.setItem('type', userData?.type)
        setView(userData?.type as ViewState)
      }

      setProfile(userData)
    }
  }
  const logOut = async () => {
    setToken(null)
    setProfile({})
    setIsAuthenticated(false)
    localStorage.clear()
  }
  //chech if profile has non empty seller key
  const sellerKeyCheck = () => {
    setIsAuthenticated(false)
  }

  React.useEffect(() => {
    if (data && data.data) {
      // if (typeof data?.type !== 'undefined' || data?.type !== 'undefined') {
      //   localStorage.setItem('type', data?.type)
      //   setView(data.type)
      // }
      setToken(data.data.accessToken)
      setIsAuthenticated(true)
    }
  }, [data, OTP])

  const value = React.useMemo(
    () => ({
      isValidating,
      profile: profile || undefined,
      view,
      error: globalError?.message,
      isAuthenticated,
      isLoading,
      token,
      OTP,
      loadUserProfile,
      loginWithOtp,
      loginWithRegistraionOtp,
      loginWithPhone,
      logOut,
      sellerKeyCheck
    }),
    [isValidating, profile, globalError, OTP, isAuthenticated, token, view, isLoading]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

/**
 * Return full auth context
 */
const useAuth = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error('useAuth() can only be used within AuthProvider')
  }

  return context
}
export default useAuth

/**
 * Return boolean value indicating whether the user is authenticated
 */
export const useIsAuthenticated = () => {
  const context = React.useContext(Context)

  if (!context) {
    throw new Error('useIsAuthenticated() can only be used within AuthProvider')
  }

  return !!context.profile
}
