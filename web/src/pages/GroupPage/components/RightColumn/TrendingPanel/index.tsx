import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { TUser } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container, ProfileCircle, Info } from './styles';

const TrendingPanel: React.FC = () => {

  const [members_group, setMembersGroup] = useState<TUser[]>([])

  useEffect(() => {
    api.get<TUser[]>('/groups_page/members/1').then((response) => {
      setMembersGroup(response.data)
    })
  }, [])

  return (
    <Container>
      <Panel>
        <span className="title">Membros do Grupo</span>
        {members_group.map((user:TUser) => {
            <div>
              <ProfileCircle src={user.image_url} />

              <Info>
                <strong>{user.name}</strong>

              </Info>

            </div>
        })}
      </Panel>
    </Container>
  );
};

export default TrendingPanel;
