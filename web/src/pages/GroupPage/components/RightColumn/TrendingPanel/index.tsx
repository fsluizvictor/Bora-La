import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { TInfo, TUser } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container, ProfileCircle, Info } from './styles';

const TrendingPanel: React.FC<TInfo> = ({ group_id, user_id }) => {

  const [members_group, setMembersGroup] = useState<TUser[]>([])

  useEffect(() => {
    api.get<TUser[]>(`/groups_page/members/${group_id}`).then((response) => {
      setMembersGroup(response.data)
    })
  }, [])

  return (
    <Container>
      <Panel>
        <span className="title">Membros do Grupo</span>
        <ul>
          {members_group.map((user: TUser) => (
            <li>
              <ProfileCircle src={user.image_url} />
              <span className="bullet" />
              <span className="news">
                <span className="head">{user.name}</span>
                <span className="subtext">{user.course}</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </Container>
  );
};

export default TrendingPanel;
