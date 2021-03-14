import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TComent, TGroup, TPost } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import {
  Container,
  Row,
  Separator,
  Avatar,
  Column,
} from './styles';

const FeedPost: React.FC = () => {

  const [contentFeedPost, setContentFeedPost] = useState<TGroup[]>([])

  useEffect(() => {
    api.get<TGroup[]>('/users/groups/1').then(response => {
      setContentFeedPost(response.data)
    })
  }, [])


  return (

      <Panel>
        <Container>
      {contentFeedPost.map((post) => (
          <>
              <Row className="heading">
                <Avatar src={post.image_url} alt="Member" />
                <Column>
                  <h3>{post.name}</h3>
                  <h4>Ciências Exatas</h4>
                  <time>{post.date}</time>
                </Column>
              </Row>

              <Row>
                <Separator />
              </Row>

              <Row>
                <p>
                  {post.description}
                </p>
              </Row>
          </>
      ))}
      </Container>
      </Panel>

  );
};

export default FeedPost;
