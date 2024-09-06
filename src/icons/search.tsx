import React from 'react'
import { IconProps } from './types'

const Search: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="-4 -4 24 24" fill="black" {...rest}>
    <path
      fill="#555"
      d="M15.5 14h-.79l-.28-.27a6.51 6.51 0 10-.7.7l.27.28v.79l5 4.99L20.49 19zm-6 0A4.5 4.5 0 1114 9.5 4.494 4.494 0 019.5 14z"
      transform="translate(-3 -3)"
    />
  </svg>
)

export default Search
