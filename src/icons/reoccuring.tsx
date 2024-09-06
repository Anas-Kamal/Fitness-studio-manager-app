import React from 'react'
import { IconProps } from './types'

const ReoccuringIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="black" {...rest}>
    <path
      d="M15.55 5.55L11 1v3.07a7.992 7.992 0 000 15.86v-2.02a5.993 5.993 0 010-11.82V10zM19.93 11a7.906 7.906 0 00-1.62-3.89l-1.42 1.42A5.806 5.806 0 0117.91 11zM13 17.9v2.02a7.924 7.924 0 003.9-1.61l-1.44-1.44A5.786 5.786 0 0113 17.9zm3.89-2.42l1.42 1.41A7.906 7.906 0 0019.93 13h-2.02a5.9 5.9 0 01-1.02 2.48z"
      transform="translate(-4 -1)"
    />
  </svg>
)

export default ReoccuringIcon
