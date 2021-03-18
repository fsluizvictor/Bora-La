import React from 'react';

import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';
import ProfilePanel from './ProfilePanel';
import HashtagPanel from './HashtagPanel';

import { Container } from './styles';
import { TInfo } from '../../../../utils/types/types';

const LeftColumn: React.FC<TInfo> = ({ group_id, user_id }) => {
  return (
    <Container className="left-column">

      <ProfilePanel group_id={group_id} user_id={user_id} />
      {/* <HashtagPanel /> */}

    </Container>
  );
};

export default LeftColumn;