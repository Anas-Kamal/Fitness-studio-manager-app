import React from 'react'
import { IconProps } from './types'

const CheckMark: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 24 24" {...rest}>
    <path fill="none" stroke="#f9f9f9" strokeMiterlimit="10" strokeWidth="1" d="M.348 3.21l3.054 2.958L6.863.252" />
  </svg>
)

export default CheckMark
