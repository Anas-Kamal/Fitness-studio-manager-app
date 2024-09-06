import * as React from 'react'
import cls from 'classnames'
import styles from './label-wrapper.module.scss'

interface ChildrenWrapperProps {
  id: string
}

export interface LabelWrapperProps {
  style?: React.CSSProperties
  className?: string
  title?: string
  note?: React.ReactNode
  error?: string | null
  required?: boolean
  children: (props: ChildrenWrapperProps) => React.ReactElement
}

const LabelWrapper: React.FC<LabelWrapperProps> = ({
  style,
  className,
  title,
  required = false,
  note,
  error,
  children,
}) => {
  const id = React.useId()

  const input = children({ id })

  return (
    <div className={cls(styles.wrapper, className)} style={style}>
      {title ? (
        <label
          htmlFor={id}
          className={cls({
            [styles.required]: required,
          })}
        >
          {title}
        </label>
      ) : null}

      {input}

      {note && !error ? <span className={styles.note}>{note}</span> : null}

      {error ? <span className={styles.error}>{error}</span> : null}
    </div>
  )
}

export default LabelWrapper
