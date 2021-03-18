import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';
import { TGroup } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import {
  Container,
  Row,
  Separator,
  Avatar,
  Column,
} from './styles';

const FeedPost: React.FC = () => {

  const [contentGroup, setContentGroup] = useState<TGroup[]>([])

  useEffect(() => {
    api.get<TGroup[]>('/users/groups/1').then(response => {
      setContentGroup(response.data)
    })
  }, [])


  return (

    <Panel>
      <Container>
        {contentGroup.map((group) => (
          <>
            <Link to={`/groups_page/1/1`} >
              <Row className="heading">
                <Avatar src={group.image_url} alt="Member" />
                <Column>
                  <h3>{group.name}</h3>
                  <h4>Ciências Exatas</h4>
                  <time>{group.date}</time>
                </Column>
              </Row>

              <Row>
                <Separator />
              </Row>

              <Row>
                <p>
                  {group.description}
                </p>
              </Row>
            </Link>
          </>
        ))}
      </Container>
    </Panel>

  );
};

export default FeedPost;
