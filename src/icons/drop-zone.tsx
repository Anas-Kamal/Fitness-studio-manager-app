import React from 'react'
import { IconProps } from './types'

const DropZoneIcon: React.FC<IconProps> = ({ size = 24, ...rest }) => (
  <svg width={size} height={size} fill="none" viewBox="0 0 56 56" {...rest}>
    <path
      d="M26.2507 44.9163H15.7507C13.1733 44.9163 11.084 42.827 11.084 40.2497V37.333M11.084 37.333V15.7497C11.084 13.1723 13.1733 11.083 15.7507 11.083H40.2507C42.828 11.083 44.9173 13.1723 44.9173 15.7497V28.583L38.7004 22.0251C36.7888 19.7999 33.324 19.8703 31.5038 22.1667L31.4805 22.1965C31.2619 22.4793 27.9121 26.8118 25.4939 29.8884M11.084 37.333L17.4918 29.1819C19.3088 26.8706 22.7845 26.795 24.7004 29.0251L25.4939 29.8884M25.4939 29.8884L28.584 33.2497M25.4939 29.8884C25.4856 29.8989 25.4774 29.9094 25.4691 29.92"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M39.666 34.417V44.917"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M44.916 39.667L34.416 39.667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default DropZoneIcon
