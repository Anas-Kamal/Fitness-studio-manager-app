import * as React from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import cls from 'classnames'
import styles from './drop-zone.module.scss'
import UploadImageIcon from '../../icons/upload-image'

export interface DropZoneProps {
  /**
   * Max number of files to upload
   *
   * @default 20
   */
  maxFiles?: number

  /**
   * Max file size allowed to upload
   *
   * @default 20mb
   */
  maxFileSize?: number

  /**
   * File types to accept
   *
   * @default { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
   */
  accept?: Accept

  /**
   * Callback to execute for each dropped file
   * @param file
   */
  onDrop?: (file: File) => void
}

const DropZone = React.forwardRef<HTMLDivElement, DropZoneProps>((props, ref) => {
  const {
    maxFiles = 20,
    maxFileSize = 1024 * 1024 * 50,
    accept = { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] },
    onDrop = () => null,
  } = props

  const handleDropFiles = (accepted: File[]) => {
    accepted.forEach(onDrop)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDropFiles,
    multiple: maxFiles > 1,
    maxSize: maxFileSize,
    maxFiles,
    accept,
  })

  return (
    <div
      className={cls(styles.wrapper, {
        [styles.isActive]: isDragActive,
      })}
      ref={ref}
      {...getRootProps()}
    >
      <input {...getInputProps()} />

      <UploadImageIcon />

      <p>גרור או העלה קובץ לכאן</p>
    </div>
  )
})

export default DropZone
