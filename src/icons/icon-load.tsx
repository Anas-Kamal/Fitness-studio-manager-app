import React from 'react'
import { IconProps } from './types'

const IconLoader: React.FC<IconProps> = ({ size = 81, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="49.681"
    fill="white"
    style={{ zIndex: 100 }}
    height="49.681"
    viewBox="0 0 81 81"
  >
    <path
      id="ic_face_24px"
      d="M19.388,26.219a3.105,3.105,0,1,0,3.105,3.105A3.106,3.106,0,0,0,19.388,26.219Zm14.9,0A3.105,3.105,0,1,0,37.4,29.324,3.106,3.106,0,0,0,34.292,26.219ZM26.84,2a24.84,24.84,0,1,0,24.84,24.84A24.849,24.849,0,0,0,26.84,2Zm0,44.713A19.9,19.9,0,0,1,6.968,26.84,20.14,20.14,0,0,1,7.092,24.7,24.994,24.994,0,0,0,20.034,11.365,24.776,24.776,0,0,0,40.3,21.872a24.245,24.245,0,0,0,5.589-.646A19.842,19.842,0,0,1,26.84,46.713Z"
      transform="translate(-2 -2)"
      fill="#fafafa"
    />
    <svg width={size} height={size} viewBox="0 0 81 81" fill="black" {...rest}>
      <circle cx="40.5" cy="40.5" r="40.5" fill="#e6e6e6" data-name="Ellipse 550" />
    </svg>
  </svg>
)

export default IconLoader
