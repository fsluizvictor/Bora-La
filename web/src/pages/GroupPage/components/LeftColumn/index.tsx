import React from 'react';

import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';
import ProfilePanel from './ProfilePanel';
import HashtagPanel from './HashtagPanel';

import { Container } from './styles';
import { TInfo } from '../../../../utils/types/types';

const LeftColumn: React.FC<TInfo> = ({ id_group, id_user }) => {
  return (
    <Container className="left-column">

      <ProfilePanel id_group={id_group} id_user={id_user} />
      {/* <HashtagPanel /> */}

    </Container>
  );
};

export default LeftColumn;