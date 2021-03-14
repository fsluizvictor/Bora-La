import React, { useState, useEffect } from 'react';
import api from '../../../../../services/api';
import { TUser } from '../../../../../utils/types/types';
import { Link } from 'react-router-dom'

import Panel from '../../Panel';

import { Container, EditIcon } from './styles';

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
        <span className="tag">
          {console.log(dataUser?.email)}
          <Link to={{
            pathname: "/updateUser_page",
            state: {...dataUser}
          }}
          >
            <EditIcon />
            Editar
          </Link>
        </span>
      </Panel>
    </Container>
  );
};

export default HashtagPanel;
