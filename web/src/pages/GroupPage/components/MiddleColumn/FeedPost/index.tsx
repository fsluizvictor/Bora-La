import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TInfo, TPost } from '../../../../../utils/types/types';

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

const FeedPost: React.FC<TInfo> = ({ group_id, user_id }) => {

  const [contentFeedPost, setContentFeedPost] = useState<TPost[]>([])
  const [formData, setFormData] = useState({
    contents: ''
  })

  useEffect(() => {
    api.get<TPost[]>(`groups_page/posts/${group_id}`).then(response => {
      setContentFeedPost(response.data)
    })
  }, [])

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

    await api.post(`groups_page/coments/${group_id}/${user_id}`, data)

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
                  alt="Attachment"
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
                <Avatar src={post.user.image_url} alt="Member" />
                <textarea
                  id={String(post.id)}
                  name="contents"
                  placeholder="Insira um comentário..."
                  onChange={handleTextAreaChange}
                />
                <button>
                  <SendIcon />
                </button>
              </Row>

              <Row>
                <Separator />
              </Row>

              {console.log(post.coments)}
              {post.coments.map((coment) => (
                <>
                  <Row className="coment">
                    <Avatar src={coment.user.image_url} alt="Member" />
                    <Column>
                      <h3>{coment.user.name}</h3>
                      <h4>Engenharia de Computação</h4>
                      <time>{coment.date}</time>
                      <p>{coment.contents}</p>
                    </Column>
                  </Row>
                </>
              )
              )}

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
