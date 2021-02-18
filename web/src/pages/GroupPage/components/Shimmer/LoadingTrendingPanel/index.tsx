import React from 'react';

import { Container } from '../../MobileHeader/styles';
import Skeleton from '../../Skeleton'

const LoadingTrendingPanel: React.FC = () => {
    const Row = () => (
        <div className="row">
            <Skeleton className="square-skeleton white" />

            <div className="column">
                <Skeleton className="row-skeleton white" />
                <Skeleton className="row-skeleton white" />
            </div>
        </div>

    )

    return (
        <Container>
            <Row />
            <Row />
            <Row />
        </Container>
    )
}

export default LoadingTrendingPanel;