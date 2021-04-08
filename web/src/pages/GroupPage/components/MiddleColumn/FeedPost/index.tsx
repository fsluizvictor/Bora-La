import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TInfo, TPost, TUser } from '../../../../../utils/types/types';

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
  DenounceIcon,
} from './styles';

const FeedPost: React.FC<TInfo> = ({ group_id, user_id }) => {

  const [contentFeedPost, setContentFeedPost] = useState([])
  const [formData, setFormData] = useState({
    contents: ''
  })
  const [dataUser, setDataUser] = useState<TUser>()
  const [idPost, setIdPost] = useState<number>()

  useEffect(() => {
    api.get(`groups_page/posts/${group_id}`).then(response => {
      setContentFeedPost(response.data)
      //setFormData(response.data.map(() => ({ contents: '' })))
    })
  }, [])

  useEffect(() => {
    api.get(`/users/${user_id}`).then(response => {
      setDataUser(response.data)
    })
  }, [])

  function handleTextAreaComent(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target

    setFormData({ ...formData, [name]: value })

  }


  async function handleSubmit(event: FormEvent) {
    //event.preventDefault()

    const {
      contents
    } = formData

    console.log(idPost)
    console.log(contents)

    await api.post(`groups_page/coments/${idPost}/${user_id}`, formData)

  }

  function handleTextAreaChange(id: number) {
    setIdPost(id)
  }

  return (
    <form onSubmit={handleSubmit} >
      {contentFeedPost.map((post: TPost, i: number) => (

        <>
          <Panel>
            <Container>
              <Row className="heading">
                <Avatar src={post.user.image_url} alt="Member" />
                <Column>
                  <h3>{post.user.name}</h3>
                  <h4>{post.user.course}</h4>
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
                <span className="number"></span>
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
                  <DenounceIcon />
                  <span>Denunciar</span>
                </button>
              </Row>

              <Row>
                <Separator />
              </Row>

              <Row>
                <Avatar src={dataUser?.image_url} alt="Member" />
                <textarea
                  id={String(post.id)}
                  name="contents"
                  placeholder="Insira um comentário..."
                  onChange={handleTextAreaComent}
                  onClick={() => { handleTextAreaChange(post.id) }}
                //value={formData[i].contents}
                />
                <button
                  type="submit"
                >
                  <SendIcon />
                </button>
              </Row>

              <Row>
                <Separator />
              </Row>

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
