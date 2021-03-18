import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel'
import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
import { LoadingProps, TInfo } from '../../../../utils/types/types';

const RightColumn: React.FC<TInfo> = ({ group_id, user_id }) => {
  return (
    <Container className="right-column">
      <TrendingPanel group_id={group_id} user_id={user_id} />
    </Container>
  );
};

export default RightColumn;
