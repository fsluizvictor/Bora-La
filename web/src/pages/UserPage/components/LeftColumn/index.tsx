import React from 'react';

import LoadingProfilePanel from '../Shimmer/LoadingProfilePanel';
import ProfilePanel from './ProfilePanel';
import HashtagPanel from './HashtagPanel';

import { Container } from './styles';
import { LoadingProps, TInfo } from '../../../../utils/types/types';

const LeftColumn: React.FC<TInfo> = ({ user_id }) => {
  return (
    <Container className="left-column">
      <>
        <ProfilePanel user_id={user_id} />
        <HashtagPanel user_id={user_id} />
      </>
    </Container>
  );
};

export default LeftColumn;