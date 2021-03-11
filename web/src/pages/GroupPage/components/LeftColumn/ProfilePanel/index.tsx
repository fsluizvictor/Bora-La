import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { TGroup, TPost } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container } from './styles';

const ProfilePanel: React.FC = () => {

  const [profilePicture, setProfilePicture] = useState<TGroup>()

  useEffect(() => {
    api.get('groups/1').then(response => {
      setProfilePicture(response.data)
    })
  })

  return (
    <Panel>
      <Container>
        <div className="profile-cover"></div>
        <img
          src={profilePicture?.image_url}
          //src="https://www.youtz.com.br/wp-content/uploads/2019/10/YOUTZ-MATEMATICA-ENEM-870x420.jpg"
          alt="Avatar"
          className="profile-picture"
        />
        <h1>{profilePicture?.name}</h1>
        <h2>{profilePicture?.occupation_area}</h2>

        <div className="separator"></div>

        <div className="key-value">
          <span className="key">Quantidade de membros</span>
          <span className="value">100</span>
        </div>
        <div className="key-value">
          <span className="key">Quantidade de posts</span>
          <span className="value">50</span>
        </div>
      </Container>
    </Panel>
  );
};

export default ProfilePanel;
