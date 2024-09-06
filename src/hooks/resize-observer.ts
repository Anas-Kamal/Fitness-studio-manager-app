import * as React from 'react'

const getWidth = () =>
  window?.innerWidth || document?.documentElement.clientWidth || document?.body?.clientWidth || 1200

const useResizeObserver = () => {
  const [width, setWidth] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (typeof document !== undefined) {
      setWidth(getWidth())
    }
  }, [typeof document])
  React.useEffect(() => {
    const resizeListener = () => {
      setWidth(getWidth())
    }

    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return width
}

export default useResizeObserver
