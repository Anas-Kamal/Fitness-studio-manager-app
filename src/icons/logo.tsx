import React from 'react'
import { IconProps } from './types'

const Logo: React.FC<IconProps> = ({ size = 104, ...rest }) => (
  <svg width={size} height={size / 2} viewBox="-5 0 168 41" fill="black" {...rest}>
    <g data-name="Group 3171" transform="translate(21978 22538.586)">
      <g fill="#fff" stroke="#6f6f6f" strokeWidth="3" data-name="Ellipse 557" transform="translate(-21978 -22518)">
        <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
        <circle cx="7.5" cy="7.5" r="6" fill="none" />
      </g>
      <text
        fill="#151517"
        fontFamily="Galvji-Bold, Galvji"
        fontSize="35"
        fontWeight="700"
        letterSpacing="-.044em"
        transform="translate(-21956 -22504.586)"
      >
        <tspan x="0" y="0">
          BOUNCE
        </tspan>
      </text>
      <g fill="#fff" stroke="#2e2e2e" strokeWidth="3" data-name="Ellipse 558" transform="translate(-21978 -22524)">
        <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
        <circle cx="7.5" cy="7.5" r="6" fill="none" />
      </g>
      <g fill="#fff" stroke="#241f1f" strokeWidth="3" data-name="Ellipse 559" transform="translate(-21978 -22530)">
        <circle cx="7.5" cy="7.5" r="7.5" stroke="none" />
        <circle cx="7.5" cy="7.5" r="6" fill="none" />
      </g>
    </g>
  </svg>
)

export default Logo