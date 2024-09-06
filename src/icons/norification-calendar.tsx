import * as React from 'react'
import { IconProps } from './types'

const NotifyCalendar = React.forwardRef<SVGSVGElement, IconProps>(({ size = 24, ...rest }, ref) => (
  <svg
    style={{ backgroundColor: '#D0FDE8', borderRadius: '50%' }}
    width={size}
    height={size}
    viewBox="-5 -5 24 24"
    fill="none"
    ref={ref}
    {...rest}
  >
    <path
      fill="#241f1f"
      d="M7 8H5.666v1.33H7zm2.664 0H8.331v1.33h1.333zm2.666 0H11v1.33h1.333zm1.333-4.665H13V2h-1.337v1.333H6.332V2H5v1.333h-.667a1.327 1.327 0 00-1.326 1.333L3 13.995a1.332 1.332 0 001.333 1.333h9.329a1.337 1.337 0 001.333-1.333V4.666a1.337 1.337 0 00-1.333-1.333zm0 10.662h-9.33V6.665h9.329z"
      transform="translate(-3 -2)"
    />
  </svg>
))

export default NotifyCalendar
