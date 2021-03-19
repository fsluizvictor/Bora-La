import React, { useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TUser } from '../../../../../utils/types/types';
import {
  Link,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Panel from '../../Panel';
import UpdateUser from '../../../../UpdateUser '

import { Container, EditIcon, GroupIcon } from './styles';

const HashtagPanel: React.FC = () => {

  const [dataUser, setDataUser] = useState<TUser>()

  useEffect(() => {
    api.get('users/1').then(response => {
      setDataUser(response.data)
    })
  }, [])


  return (
    <Container>
      <Panel>
        <span className="title">Descrição</span>
        <p>{dataUser?.description}</p>
      </Panel>
      <Panel>
        <span className="tag">
          <Link style={{ textDecoration: 'none',color:'var(--color-black)' }} to='/updateUser_page/1'>
            <EditIcon />
            Editar Perfil
          </Link>
        </span>
        <span className="tag">
          <Link style={{ textDecoration: 'none',color:'var(--color-black)' }} to='/CreateGroup'>
            <GroupIcon />
            Criar Grupo
          </Link>
        </span>
      </Panel>

    </Container>
  );
};

export default HashtagPanel;
