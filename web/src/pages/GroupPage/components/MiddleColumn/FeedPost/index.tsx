import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from '../../../../../services/api';

import Panel from '../../Panel';

import {
  Container,
  Row,
  PostImage,
  Separator,
  Avatar,
  Column,
  LikeIcon,
  CommentIcon,
  ShareIcon,
  SendIcon,
} from './styles';



const FeedPost: React.FC = () => {

  const [formData, setFormData] = useState({
    contents: ''
  })

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const {
      contents
    } = formData

    setFormData({
      contents: ""
    })

    const data = {
      contents
    }

    await api.post('groups_page/coments/1', data)

  }

  function resetTextArea() {

  }

  function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

  }

  return (
    <Panel>
      <Container>
        <form onSubmit={handleSubmit} >

          <Row className="heading">
            <Avatar src="https://i.imgur.com/81RtXfT.jpg" alt="Rocketseat" />
            <Column>
              <h3>Rocketseat</h3>
              <h4>Instituição de ensino</h4>
              <time>1 sem</time>
            </Column>
          </Row>
          <PostImage
            src="https://blog.rocketseat.com.br/content/images/2019/05/Painel.png"
            alt="Rocketseat Blog"
          />

          <Row className="likes">
            <span className="circle blue" />
            <span className="circle green" />
            <span className="circle red" />
            <span className="number">49</span>
          </Row>

          <Row>
            <Separator />
          </Row>

          <Row className="actions">
            <button>
              <LikeIcon />
              <span>Gostei</span>
            </button>
            <button>
              <CommentIcon />
              <span>Comentar</span>
            </button>
            <button>
              <ShareIcon />
              <span>Compartilhar</span>
            </button>
            <button>
              <SendIcon />
              <span>Enviar</span>
            </button>
          </Row>

          <Row>
            <Separator />
          </Row>

          <Row>
            <Avatar src="https://i.imgur.com/81RtXfT.jpg" alt="Rocketseat" />
            <textarea
              id="contents"
              name="contents"
              placeholder="Insira um comentário..."
              value={formData.contents}
              onChange={handleTextAreaChange}
            />
            <button>
              <SendIcon />
            </button>
          </Row>
        </form>

      </Container>
    </Panel>
  );
};

export default FeedPost;
