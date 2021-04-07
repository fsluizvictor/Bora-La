import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../../services/api';
import { TGroup, TInfo } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import {
  Container,
  Row,
  Separator,
  Avatar,
  Column,
} from './styles';

const FeedPost: React.FC<TInfo> = ({ user_id }) => {

  const [contentGroup, setContentGroup] = useState<TGroup[]>([])

  useEffect(() => {
    api.get<TGroup[]>(`/users/groups/${user_id}`).then(response => {
      setContentGroup(response.data)
    })
  }, [])


  return (

    <>
      {contentGroup.map((group) => (
        <Container>
          <Panel>
            <Link style={{ textDecoration: 'none', color: 'var(--color-black)' }} to={`/groups_page/${group.id_group}/${user_id}`} >
              <Row className="heading">
                <Avatar src={group.image_url} alt="Member" />
                <Column>
                  <h3>{group.name}</h3>
                  <h4>Ciências Exatas</h4>
                  <time>{group.date}</time>
                </Column>
                {/* <div className="exit">
                

                <button>aqui</button>
                
                </div> */}
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
          </Panel>
        </Container>
      ))}
    </>

  );
};

export default FeedPost;
