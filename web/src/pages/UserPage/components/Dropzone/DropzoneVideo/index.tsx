import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { VideoCameraIcon } from './styles'

interface Props {
    onFileUploaded: (file: File) => void
}

const DropzoneImage: React.FC<Props> = ({ onFileUploaded }) => {

    const [selectedFileUrl, setSelectedFileUrl] = useState('')

    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0]

        const fileURL = URL.createObjectURL(file)

        setSelectedFileUrl(fileURL)
        onFileUploaded(file)
    }, [onFileUploaded])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*'
    })

    return (

        <button {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            <VideoCameraIcon />
             Vídeo
        </button>

    )
}

export default DropzoneImage