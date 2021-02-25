import React from 'react';

import Panel from '../../Panel';

import { Container } from './styles';

const ProfilePanel: React.FC = () => {
  return (
    <Panel>
      <Container>
        <div className="profile-cover"></div>
        <img
          src="https://www.youtz.com.br/wp-content/uploads/2019/10/YOUTZ-MATEMATICA-ENEM-870x420.jpg"
          alt="Avatar"
          className="profile-picture"
        />
        <h1>Cálculo 1</h1>
        <h2>Ciências Exatas e da Terra</h2>

        <div className="separator"></div>

        <div className="key-value">
          <span className="key">Quantidade de membros</span>
          <span className="value">100</span>
        </div>
        <div className="key-value">
          <span className="key">Quantidade de posts</span>
          <span className="value">50</span>
        </div>
      </Container>
    </Panel>
  );
};

export default ProfilePanel;
