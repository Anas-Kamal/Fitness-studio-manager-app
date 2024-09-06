import React, { useState } from 'react'
import './generate-copy-link.module.scss'
import useAuth from '../../features/auth'

const GenerateCopyURLComponent = () => {
  const { profile } = useAuth()
  const [generatedURL, setGeneratedURL] = useState('')
  const [copied, setCopied] = useState(false)

  const generateURL = () => {
    // Your URL generation logic here
    const newURL = 'https://example.com' // Replace with your actual URL generation logic
    setGeneratedURL(newURL)
    //update studio url
    setCopied(false)
  }

  const copyURL = () => {
    navigator.clipboard
      .writeText(generatedURL)
      .then(() => {
        setCopied(true)
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error)
      })
  }

  return (
    <div className="generate-copy-url-container bg-slate-300 rounded ">
      <button onClick={generateURL}></button>
      {generatedURL && (
        <div className="url-container bg-slate-300">
          <input
            type="text"
            value={generatedURL}
            id="generatedURL"
            readOnly
            className="bg-slate-300"
          />
          <button onClick={copyURL}>{copied ? 'Copied!' : 'Copy URL'}</button>
        </div>
      )}
    </div>
  )
}

export default GenerateCopyURLComponent
