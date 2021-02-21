import React, { ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import DropzoneImage from '../../Dropzone/DropzoneImage';
import DropzoneVideo from '../../Dropzone/DropzoneVideo';
import DropzoneDocument from '../../Dropzone/DropzoneDocument';
import api from '../../../../../services/api'

import Panel from '../../Panel';

import {
  Container,
  WriteIcon,
  SendIcon
} from './styles';

const FeedShare: React.FC = () => {

  const [selectedImage, setselectedImage] = useState<File>()
  const [selectedVideo, setselectedVideo] = useState<File>()
  const [selectedDocument, setselectedDocument] = useState<File>()
  const history = useHistory()

  const [formData, setFormtData] = useState({
    contents: ''
  })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const {
      contents
    } = formData

    const data = new FormData()

    data.append('contents', contents)

    if (selectedImage) {
      data.append('image', selectedImage)
    }

    if (selectedDocument) {
      data.append('image', selectedDocument)
    }

    if (selectedVideo) {
      data.append('image', selectedVideo)
    }

    await api.post('groups_page/1', data)

    history.push('/groups_page')
  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {

    const { name, value } = event.target

    setFormtData({
      ...formData,
      [name]: value
    })
  }

  return (
    <Panel>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="write">
            <WriteIcon />
            <textarea
              id="contents"
              name="contents"
              placeholder="Começar uma publicação"
              onChange={handleTextAreaChange}
            />

            {/* <span>Começar uma publicação</span> */}
          </div>
          <div className="attachment">
            <DropzoneImage
              onFileUploaded={setselectedImage}
            />
            {/* <button>
              <CameraIcon />
            Foto
          </button> */}
            <DropzoneVideo
              onFileUploaded={setselectedVideo}
            />

            {/* <button>
              <VideoCameraIcon />
            Video
          </button> */}

            <DropzoneDocument
              onFileUploaded={setselectedDocument}
            />

            {/* <button>
              <DocumentIcon />
            Documento
          </button> */}
            <button
              type="submit"
            >
              <SendIcon />
            Publicar
          </button>
          </div>
        </form>
      </Container>
    </Panel>
  );
};

export default FeedShare;
