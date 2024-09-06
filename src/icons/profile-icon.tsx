import React from 'react'
import { IconProps } from './types'

const SettingsProfileIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="-2 -2 24 24" fill="black" {...rest}>
    <path
      d="M9 11.75A1.25 1.25 0 1010.25 13 1.25 1.25 0 009 11.75zm6 0A1.25 1.25 0 1016.25 13 1.25 1.25 0 0015 11.75zM12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8.011 8.011 0 01-8-8 8.108 8.108 0 01.05-.86 10.062 10.062 0 005.21-5.37A9.974 9.974 0 0017.42 10a9.76 9.76 0 002.25-.26A7.988 7.988 0 0112 20z"
      transform="translate(-2 -2)"
    />
  </svg>
)

export default SettingsProfileIcon
