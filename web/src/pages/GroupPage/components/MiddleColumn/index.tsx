import React from 'react';

import LoadingFeedShare from '../Shimmer/LoadingFeedShare';
import FeedPost from './FeedPost';
import FeedShare from './FeedShare';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';

import { Container } from './styles';
import { TInfo } from '../../../../utils/types/types';

const MiddleColumn: React.FC<TInfo> = ({ group_id, user_id }) => {
  return (
    <Container className="middle-column">
      <FeedShare group_id={group_id} user_id={user_id} />
      <FeedPost group_id={group_id} user_id={user_id} />
    </Container>
  );
};

export default MiddleColumn;
