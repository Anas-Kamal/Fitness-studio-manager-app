import React from 'react'
import { IconProps } from './types'

const CheckSign: React.FC<IconProps> = ({ ...rest }) => (
  <svg width={18} height={13} viewBox="0 0 18 13" fill="black" {...rest}>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" transform="translate(-3.41 -5.59)" />
  </svg>
)

export default CheckSign
