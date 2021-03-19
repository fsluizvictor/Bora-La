import React, { useEffect, useState } from 'react';
import api from '../../../../../services/api';
import { TCountMembersPosts, TGroup, TInfo } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container } from './styles';

const ProfilePanel: React.FC<TInfo> = ({ group_id, user_id }) => {

  const [profilePicture, setProfilePicture] = useState<TGroup>()
  const [countMembers, setcountMembers] = useState<number>()

  useEffect(() => {
    api.get<TGroup>(`groups/${group_id}`).then(response => {
      setProfilePicture(response.data)
    })
  }, [])

  useEffect(() => {
    api.get(`groups/count/${group_id}`).then(response => {
      setcountMembers(response.data)
    })
  }, [])

  console.log(countMembers)

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
          <span className="value">1</span>
        </div>
        <div className="key-value">
          <span className="key">Quantidade de posts</span>
          <span className="value">29</span>
        </div>
      </Container>
    </Panel>
  );
};

export default ProfilePanel;
