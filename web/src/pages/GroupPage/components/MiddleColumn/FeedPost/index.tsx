import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TPost } from '../../../../../utils/types/types';

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

  const [contentFeedPost, setContentFeedPost] = useState<TPost>()
  const [formData, setFormData] = useState({
    contents: ''
  })

  useEffect(() => {
    api.get('groups_page/posts/1').then(response => {
      setContentFeedPost(response.data)
    })
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

    await api.post('groups_page/coments/1/1', data)

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
            <Avatar src={contentFeedPost?.user.image_url} alt="Member" />
            <Column>
              <h3>{contentFeedPost?.user.name}</h3>
              <h4>{contentFeedPost?.user.course}</h4>
              <time>{contentFeedPost?.date}</time>
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
            <Avatar src="https://github.com/fsluizvictor.png" alt="Rocketseat" />
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
