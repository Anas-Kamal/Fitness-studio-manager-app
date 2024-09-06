import React from 'react'
import { Control } from 'react-hook-form'
import Logo from '../../icons/logo'
import UploadImage from '../../icons/upload'
import supabase from '../../features/supabase-client'
import { useDropzone } from 'react-dropzone'
import { MongoSelector, mongoSelector } from '../../features/fetchers'
import ENDPOINTS from '../../features/endpoints'
import useSwr from 'swr'
import Button from '../components/button'
import styles from './seventh-screen.module.scss'
import { RegisterInterface } from './types'

interface RenderSixthScreenProps {
  handleSubmit: () => void
  errors: any
  control: Control<RegisterInterface, any>
}

const swrKey: MongoSelector = {
  from: ENDPOINTS.REGISTRATION.GET_PROFILE_GET,
  method: 'POST',
  body: {
    accessToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InBob25lIjoiKzk3MjUxODMxMDUwOCJ9LCJpYXQiOjE2NzUxMDA1NDMsImV4cCI6MTY3NTExNDk0M30.c6FHFosKlnGESm2uPM54hYIiB_3cNleb4xVxZwcAsfs'
  }
}

const RenderSeventhScreen = ({ errors, handleSubmit, control }: RenderSixthScreenProps) => {
  const { data: studioProfile, error } = useSwr(swrKey, mongoSelector)
  // @ts-ignore
  console.log(studioProfile?.data?.logo_url)

  const [logoUrl, setLogoUrl] = React.useState('')
  const [mainUrl, setMainUrl] = React.useState('')
  const [coverUrls, setCoverUrls] = React.useState<string[]>([...new Array(6).fill('')])

  const uploadLogoUrl = async (files: File[]) => {
    try {
      files.forEach(async (file) => {
        const { data, error: supabaseError } = await supabase.storage
          .from('studio')
          .upload(`63ab179bf31e9c851e430acc/${file.name}`, file, {
            cacheControl: '3600',
            upsert: false
          })
        if (supabaseError) {
          return
        }
        const { data: url } = supabase.storage.from('studio').getPublicUrl(data?.path)
        setLogoUrl(url.publicUrl)

        await mongoSelector({
          from: ENDPOINTS.REGISTRATION.UPDATE_PROFILE_POST,
          method: 'POST',
          body: {
            // @ts-ignore
            phone: studioProfile?.data?.phone,
            logo_url: url.publicUrl
          }
        })
        console.log(url.publicUrl)
      })
    } catch (err) {
      console.log(err)
    }
  }

  const uploadMainUrl = (file: File[]) => {
    //
  }
  const uploadCoverUrl = (file: File[]) => {
    //
  }
  const { getInputProps: getInputPropsForLogo, getRootProps: getRootPropsForLogo } = useDropzone({
    onDrop: uploadLogoUrl,
    maxFiles: 1,
    multiple: false,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  const { getInputProps: getInputPropsForCover, getRootProps: getRootPropsForCover } = useDropzone({
    onDrop: uploadCoverUrl,
    maxFiles: 10,
    multiple: 10 > 1,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  const { getInputProps: getInputPropsForMain, getRootProps: getRootPropsForMain } = useDropzone({
    onDrop: uploadMainUrl,
    maxFiles: 10,
    multiple: 10 > 1,
    maxSize: 1024 * 1024 * 50,
    accept: { 'image/*': ['.png', '.gif', '.jpeg', '.jpg'] }
  })
  console.log(logoUrl)

  return (
    <div className={styles.wrapper}>
      <img
        src="https://images.unsplash.com/photo-1546483875-ad9014c88eba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format"
        alt="trainer"
        style={{objectFit:"cover", width:"100%", height:"100%"}}

      />
      <div>
        <Logo height={120} />
        <span>תמונות</span>
        {/* // @ts-ignore */}
        <div className={styles.grid}>
          <div {...getRootPropsForLogo()} className={styles.logo} style={{ gridArea: 'logo' }}>
            {/*  @ts-ignore */}
            {studioProfile?.data?.logo_url ? (
              // @ts-ignore
              <img src={studioProfile?.data?.logo_url} alt="" />
            ) : (
              <div {...getInputPropsForLogo} className={styles.gap}>
                <UploadImage />
              </div>
            )}
            <span>לוגו של הסטודיו</span>
          </div>

          <div
            {...getRootPropsForCover()}
            className={styles.coverBlock}
            style={{ gridArea: 'cover' }}>
            {coverUrls.map((url) =>
              url ? (
                <img key={url} src={url} alt="cover" />
              ) : (
                <div key={Math.random() * 10000} {...getInputPropsForCover} className={styles.gap}>
                  <UploadImage />
                </div>
              )
            )}
          </div>
          <div {...getRootPropsForMain()} className={styles.main} style={{ gridArea: 'main' }}>
            {mainUrl ? (
              <img src={mainUrl} alt="" />
            ) : (
              <div {...getInputPropsForMain} className={styles.gap}>
                <UploadImage />
              </div>
            )}
          </div>
        </div>
        <Button type="event" className={styles.button} onClick={handleSubmit}>
          הבא
        </Button>
      </div>
    </div>
  )
}

export default RenderSeventhScreen
