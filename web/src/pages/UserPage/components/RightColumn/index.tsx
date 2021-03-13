import React from 'react';

import LoadingTrendingPanel from '../Shimmer/LoadingTrendingPanel'
import TrendingPanel from './TrendingPanel';

import { Container } from './styles';
import { LoadingProps } from '../../../../utils/types/types';
import TrendingUsers from './TrendingUsers';

const RightColumn: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Container className="right-column">
      {isLoading ? (
        <LoadingTrendingPanel />
      ) : (
          <>
           <TrendingPanel />
          </>
        )}


    </Container>
  );
};

export default RightColumn;
