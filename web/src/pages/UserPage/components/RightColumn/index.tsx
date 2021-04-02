import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel'
import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
import { LoadingProps, TInfo } from '../../../../utils/types/types';

const RightColumn: React.FC = () => {
  return (
    <Container className="right-column">
      <>
        <TrendingPanel />
      </>
    </Container>
  );
};

export default RightColumn;
