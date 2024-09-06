import React from 'react'
import { IconProps } from './types'

const Web = React.forwardRef<SVGSVGElement, IconProps>(({ size = 16, ...rest }, ref) => (
  <svg width={size} height={size} viewBox="0 0 17 17" stroke="currentColor" ref={ref} {...rest}>
    <path
      fill="#241f1f"
      d="M10.423 2a8.423 8.423 0 108.423 8.423A8.426 8.426 0 0010.423 2zm-.842 15.1a6.729 6.729 0 01-5.9-6.679 6.838 6.838 0 01.177-1.508L7.9 12.95v.842a1.69 1.69 0 001.685 1.685zm5.812-2.139a1.671 1.671 0 00-1.6-1.171h-.843v-2.525a.845.845 0 00-.842-.842H7.054V8.738h1.684a.845.845 0 00.843-.838V6.211h1.685a1.69 1.69 0 001.684-1.684v-.345a6.723 6.723 0 012.443 10.781z"
      transform="translate(-2 -2)"
    />
  </svg>
))

export default Web
