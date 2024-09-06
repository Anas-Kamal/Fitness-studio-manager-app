import * as React from 'react'
import cls from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './select.module.scss'
import Chevron from '../../icons/chevron'
import useOutsideAlerter from '../../hooks/outside-alerter'
import Preloader from '../../icons/preloader'

interface Option {
  label: string
  value: string
}

export interface SelectProps {
  id?: string

  className?: string
  style?: React.CSSProperties
  options: Option[]
  searchable?: boolean
  disabled?: boolean
  loading?: boolean
  placeholder?: string
  creatable?: boolean
  // onCreate?: (value: string) => void
  value?: string[] | string
  onChange?: (value: string[] | string) => void
  // onBlur?: () => void
}

/**
 * Okay, whatever...
 *
 * Custom uncontrolled select is not worth it
 */
const Select: React.FC<SelectProps> = ({
  id,

  className,
  style,
  searchable = true,
  creatable = false,
  disabled = false,

  placeholder,
  options = [],
  value,

  onChange = () => null,

  loading = false,
}) => {
  const ref = React.createRef<HTMLDivElement>()

  const [active, setActive] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState<string>()

  const handleElementSelect = (option: Option) => {
    if (!value || !value[0]) {
      onChange([])
    }
    if (Array.isArray(value)) {
      if (value.includes(option.value)) {
        onChange(value.filter(_ => _ !== option.value))
      } else {
        onChange([...value, option.value])
      }
    } else {
      onChange(option.value)
    }

    setActive(false)
  }

  const renderValue = () => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return <span className={styles.filterInput}>{placeholder || '–'}</span>
      }

      return (
        <div className={styles.multiValue}>
          {value.slice(0, 2).map(val => (
            <span key={val}>{options.find(_ => _.value === val)?.label}</span>
          ))}

          {value.length >= 3 ? <span>+{value.length - 2} more</span> : null}
        </div>
      )
    }
    const displayValue = options.find(_ => _.value === value)?.label
    return <span className={styles.filterInput}>{displayValue}</span>
  }

  const renderOptions = React.useCallback(() => {
    // TODO: Highlight current option
    const filtered = options.filter(_ => {
      if (!_.label) return
      return _.label.toLowerCase().includes(searchValue?.toLowerCase() || '')
    })

    return (
      <>
        {filtered.map(option => (
          <li key={option.value}>
            <button
              type="button"
              disabled={disabled}
              className={cls({
                [styles.active]: Array.isArray(value) ? value.includes(option.value) : option.value === value,
              })}
              onClick={() => handleElementSelect(option)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </>
    )
  }, [options, value, searchValue])

  useOutsideAlerter(ref, () => {
    setActive(false)
  })

  // React.useEffect(() => {
  //   if (!Array.isArray(value) && searchable) {
  //     setSearchValue(value)
  //   }
  // }, [value])

  return (
    <div className={cls(styles.wrapper, className)} style={style} ref={ref}>
      <button
        className={cls(styles.selectWrapper, {
          [styles.active]: active,
        })}
        type="button"
        disabled={disabled}
        onClick={() => setActive(true)}
        id={id}
      >
        {loading ? <Preloader /> : <Chevron size={20} direction={active ? 'up' : 'down'} />}

        {searchable || creatable ? (
          <input
            placeholder={placeholder}
            value={searchValue && value}
            onChange={event => setSearchValue(event.target.value)}
            className={styles.filterInput}
            disabled={disabled}
          />
        ) : (
          renderValue()
        )}
      </button>

      <AnimatePresence>
        {active ? (
          <motion.ul
            initial={{ opacity: 0, y: '-5px' }}
            animate={{ opacity: 1, y: '10px' }}
            exit={{ opacity: 0, y: '-5px' }}
            transition={{ duration: 0.125 }}
            className={styles.options}
          >
            {renderOptions()}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export default Select
