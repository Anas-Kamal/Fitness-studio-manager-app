import React from 'react'
import { IconProps } from './types'

const MapMarker = React.forwardRef<SVGSVGElement, IconProps>(({ ...rest }, ref) => (
  <svg width={16} height={16.4} viewBox="2 0 11 16.402" stroke="currentColor" ref={ref} {...rest}>
    <path
      d="M10.741 2A5.736 5.736 0 005 7.741C5 12.046 10.741 18.4 10.741 18.4s5.741-6.356 5.741-10.661A5.736 5.736 0 0010.741 2zm0 7.791a2.05 2.05 0 112.05-2.05 2.051 2.051 0 01-2.05 2.05z"
      transform="translate(-5 -2)"
    />
  </svg>
))

export default MapMarker
