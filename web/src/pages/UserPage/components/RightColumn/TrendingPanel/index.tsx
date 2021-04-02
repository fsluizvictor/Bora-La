import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { TGroup, TInfo } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container, ProfileCircle } from './styles';

const TrendingPanel: React.FC = () => {

  const [allGroups, setAllGroups] = useState<TGroup[]>([])

  useEffect(() => {
    api.get<TGroup[]>('/groups').then((response) => {
      setAllGroups(response.data)
    })
  }, [])

  return (
    <Container>
      <Panel>
        <span className="title">Grupos do Sistema</span>
        <ul>
          {allGroups.map((group: TGroup) => (
            <li>
              <ProfileCircle src={group.image_url} />
              <span className="bullet" />
              <span className="news">
                <span className="head">{group.name}</span>
                <span className="subtext">Ciências Exatas</span>
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </Container>
  );
};

export default TrendingPanel;
