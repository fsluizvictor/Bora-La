import React from 'react';

import FeedPost from './FeedPost';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';

import { Container } from './styles';
import { TInfo } from '../../../../utils/types/types';

const MiddleColumn: React.FC<TInfo> = ({ user_id }) => {
  return (
    <Container className="middle-column">
      <div>
        <FeedPost user_id={user_id} />
      </div>
    </Container>
  );
};

export default MiddleColumn;
