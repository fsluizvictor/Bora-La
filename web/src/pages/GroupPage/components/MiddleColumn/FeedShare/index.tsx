import React, { ChangeEvent, useEffect, useState } from 'react';
import DropzoneImage from '../../Dropzone/DropzoneImage';
import DropzoneVideo from '../../Dropzone/DropzoneVideo';
import DropzoneDocument from '../../Dropzone/DropzoneDocument';

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

  const [formData, setFormtData] = useState({
    textFeedShare: ''
  })

  async function handleSubmit() {

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
              id="textFeedShare"
              name="textFeedShare"
              placeholder="Começar uma publicação"
              value={formData.textFeedShare}
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
