import React from 'react'
import { IconProps } from './types'

const Phone = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, ...rest }, ref) => (
  <svg width={size} height={size} viewBox="0 0 16.608 15.885" stroke="currentColor" ref={ref} {...rest}>
    <path
      fill="#241f1f"
      d="M6.34 9.875a13.689 13.689 0 006.081 5.816l2.03-1.941a.947.947 0 01.941-.212 10.964 10.964 0 003.294.5.906.906 0 01.923.882V18a.906.906 0 01-.923.882C10.022 18.885 3 12.169 3 3.882A.906.906 0 013.923 3h3.229a.906.906 0 01.923.882A9.628 9.628 0 008.6 7.033a.859.859 0 01-.231.9z"
      transform="translate(-3 -3)"
    />
  </svg>
))

export default Phone
