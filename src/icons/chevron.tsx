import * as React from 'react'
import { IconProps } from './types'

interface ChevronProps extends IconProps {
  direction: 'up' | 'down' | 'left' | 'right'
}

const ROTATE_MAP: Record<ChevronProps['direction'], number> = {
  up: 270,
  down: 90,
  left: 180,
  right: 0,
}

const Chevron = React.forwardRef<SVGSVGElement, ChevronProps>(({ size = 24, direction, ...rest }, ref) => (
  <svg
    width={size}
    height={size}
    viewBox="0 2.2 24 24"
    fill="none"
    ref={ref}
    {...rest}
    style={{ transform: `rotate(${ROTATE_MAP[direction]}deg)` }}
  >
    <path fill="#241f1f" d="M10.529 6L8.59 7.939l6.3 6.311-6.3 6.311 1.939 1.939 8.25-8.25z" />
  </svg>
))

export default Chevron
