import React from 'react';

import LoadingFeedShare from '../Shimmer/LoadingFeedShare';
import FeedPost from './FeedPost';
import FeedShare from './FeedShare';
import LoadingFeedPost from '../Shimmer/LoadingFeedPost';

import { Container } from './styles';

const MiddleColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Container className="middle-column">
      {isLoading ? (
        <>
          <LoadingFeedShare />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />
          <LoadingFeedPost />

        </>
      ) : (
          <>
            <FeedShare />
            <FeedPost />
            <FeedPost />
            <FeedPost />
            <FeedPost />
          </>
        )}
    </Container>
  );
};

export default MiddleColumn;
