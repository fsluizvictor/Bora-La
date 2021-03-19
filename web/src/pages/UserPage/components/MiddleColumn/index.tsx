import React from 'react';

import FeedPost from './FeedPost';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';

import { Container } from './styles';
import { LoadingProps } from '../../../../utils/types/types';

const MiddleColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Container className="middle-column">
      {isLoading ? (
        <>
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />

        </>
      ) : (
        <>
          <div>
            <FeedPost />
          </div>
        </>
      )}
    </Container>
  );
};

export default MiddleColumn;
