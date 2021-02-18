import React from 'react';

import Panel from '../../Panel';

import {
  Container,
  WriteIcon,
  CameraIcon,
  VideoCameraIcon,
  DocumentIcon,
  ArticleIcon,
} from './styles';

const FeedShare: React.FC = () => {

  async function handleSubmit() {

  }

  function handleTextAreaChange() {
    
  }

  return (
    <Panel>
      <Container>
        <form onSubmit={handleSubmit}>
          <div className="write">
            <WriteIcon />
            <textarea onChange={handleTextAreaChange}/>
            
            {/* <span>Começar uma publicação</span> */}
          </div>
          <div className="attachment">
            <button>
              <CameraIcon />
            Foto
          </button>
            <button>
              <VideoCameraIcon />
            Video
          </button>
            <button>
              <DocumentIcon />
            Documento
          </button>
            <button
              type="submit"
            >
              <ArticleIcon />
            Escrever artigo
          </button>
          </div>
        </form>
      </Container>
    </Panel>
  );
};

export default FeedShare;
