import React from 'react';
import { TUsersGroup } from '../../../../../utils/types/types';
import { Container, Avatar, Info } from './styles'

// import { Container } from './styles';

const TrendingUsers: React.FC = () => {
    return (
        <Container>
            <div>
                <Avatar  />

                <Info>
                    <strong>Luiz Victor</strong>
                    <span>Engenharia de Computação</span>
                </Info>
            </div>
        </Container>
    );
};

export default TrendingUsers;