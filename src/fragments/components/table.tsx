import * as React from 'react'
import cls from 'classnames'
import styles from './table.module.scss'

import Chevron from '../../icons/chevron'
import Preloader from '../../icons/preloader'
import Sorter from '../../icons/sort'

export type Ordering = 'asc' | 'desc' | null

interface Header<Data = Record<string, any>> {
  title?: React.ReactNode
  orderDirection?: Ordering
  onOrderChange?: (sorting: Ordering) => void
  render?: (item: Data) => React.ReactNode
  style?: React.CSSProperties
  className?: string
  hidden?: boolean
  isFilter?: boolean
}

export interface TableProps<Data = Record<string, any>> {
  className?: string
  style?: React.CSSProperties

  loading?: boolean
  refreshing?: boolean

  columns: Header<Data>[]
  data?: Data[]
  index?: keyof Data

  onRowClick?: (item: Data) => void
  onRowHover?: (item: Data) => void
  onRowBlur?: (item: Data) => void
}

// eslint-disable-next-line react/function-component-definition
function Table<Data = Record<string, any>>({
  className,
  style,
  index = 'id' as keyof Data,
  loading = false,
  refreshing = false,
  columns,
  data = [],
  onRowClick,
  onRowHover = () => null,
  onRowBlur = () => null,
}: TableProps<Data>) {
  const nextSortOrder = (current?: Ordering) => {
    if (current === 'asc') {
      return null
    }
    if (current === 'desc') {
      return 'asc'
    }

    return 'desc'
  }

  const renderHeader = () => (
    <tr className={cls(styles.row, styles.headerRow)}>
      {columns
        .filter(_ => !_.hidden)
        .map(
          ({ title, onOrderChange, orderDirection, style: headerStyle, className: headerClassName, isFilter }, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <th key={idx} className={cls(headerClassName)} style={headerStyle}>
              {onOrderChange ? (
                <button type="button" onClick={() => onOrderChange(nextSortOrder(orderDirection))}>
                  {orderDirection === 'asc' ? <Chevron direction="up" size={16} /> : null}
                  {orderDirection === 'desc' ? <Chevron direction="down" size={16} /> : null}
                  <span>{title}</span>

                  {isFilter && <Sorter size={24} />}
                </button>
              ) : (
                <div>
                  <span>{title}</span>
                </div>
              )}
            </th>
          ),
        )}
    </tr>
  )

  const renderData = () =>
    data.map(entry => (
      <tr
        key={entry[index] as string}
        className={cls(styles.row, styles.dataRow, {
          [styles.clickable]: !!onRowClick,
        })}
        onClick={() => (onRowClick ? onRowClick(entry) : () => null)}
        onMouseOver={() => onRowHover(entry)}
        onMouseLeave={() => onRowBlur(entry)}
        onFocus={() => onRowHover(entry)}
      >
        {columns
          .filter(_ => !_.hidden)
          .map(({ render }, idx, cols) => {
            const value = render ? render(entry) : null

            // eslint-disable-next-line react/no-array-index-key
            return <td key={idx}>{idx === cols.length - 1 ? <div>{value}</div> : value}</td>
          })}
      </tr>
    ))

  const renderEmpty = () => (
    <tbody>
      <tr>
        <td colSpan={columns.length} className={styles.empty}>
          <div>
            <p>There is no data to display</p>
          </div>
        </td>
      </tr>
    </tbody>
  )

  const renderLoading = () => (
    <tbody>
      <tr>
        <td colSpan={columns.length} className={styles.empty}>
          <div>
            <Preloader size={32} />
          </div>
        </td>
      </tr>
    </tbody>
  )

  return (
    <div
      className={cls(styles.wrapper, className, {
        [styles.refreshing]: refreshing && !loading,
      })}
      style={style}
    >
      <table className={cls(styles.table)}>
        <thead>{renderHeader()}</thead>

        {data.length === 0 && !loading ? renderEmpty() : null}

        {data.length > 0 && !loading ? <tbody>{renderData()}</tbody> : null}

        {loading ? renderLoading() : null}
      </table>
    </div>
  )
}

export default Table
