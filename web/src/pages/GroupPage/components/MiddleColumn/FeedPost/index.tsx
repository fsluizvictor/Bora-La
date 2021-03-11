import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TComent, TPost } from '../../../../../utils/types/types';

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

  const [contentFeedPost, setContentFeedPost] = useState<TPost[]>([])
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
    <form onSubmit={handleSubmit} >
      {contentFeedPost.map((post) => (

        <>
          <Panel>
            <Container>
              <Row className="heading">
                <Avatar src={post.user.image_url} alt="Member" />
                <Column>
                  <h3>{post.user.name}</h3>
                  <h4>Engenharia de Computação</h4>
                  <time>{post.date}</time>
                </Column>
              </Row>

              <Row>
                <Separator />
              </Row>

              <Row>
                <p>
                  {post.contents}
                </p>
              </Row>

              <Row>
                <Separator />
              </Row>

              {post.attachment
                ?
                <PostImage
                  src={post.attachment.url}
                  alt="Rocketseat Blog"
                />
                : null
              }

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

              <Row>
                <Separator />
              </Row>

              {post.coments.map((coment: TComent) => {
                <Row className="coment">
                  <Avatar src={coment.user.image_url} alt="Member" />
                  <Column>
                    <h3>{coment.user.name}</h3>
                    <h4>Engenharia de Computação</h4>
                    <time>{coment.date}</time>
                  </Column>
                  <p>{coment.contents}</p>
                </Row>
              })}

              <Row>
                <Separator />
              </Row>

            </Container>
          </Panel>
        </>
      ))}
    </form>
  );
};

export default FeedPost;
