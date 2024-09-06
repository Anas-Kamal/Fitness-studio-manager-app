import React from 'react'
import { IconProps } from './types'

const DownloadIcon: React.FC<IconProps> = ({ size = 17, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 14 17" fill="black" {...rest}>
    <path d="M19 9h-4V3H9v6H5l7 7zM5 18v2h14v-2z" transform="translate(-5 -3)" />
  </svg>
)

export default DownloadIcon
