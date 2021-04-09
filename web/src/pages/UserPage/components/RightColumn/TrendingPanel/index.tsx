import React, { useEffect, useState } from 'react';
import { FormEvent } from 'react';
import api from '../../../../../services/api';
import { TGroup, TInfo, TUser } from '../../../../../utils/types/types';

import Panel from '../../Panel';

import { Container, ProfileCircle } from './styles';

const TrendingPanel: React.FC<TInfo> = ({ user_id }) => {

  const [allGroups, setAllGroups] = useState([])
  const [idGroup, setIdGroup] = useState<number>()

  useEffect(() => {
    api.get(`/users/groups/not/${user_id}`).then((response) => {
      setAllGroups(response.data)
    })
  }, [])

  function handleGroupToAddUser(id: number) {
    //console.log(id)
    setIdGroup(id)
  }

  async function handleSubmit(event: FormEvent) {

    //event.preventDefault()

    const id = idGroup

    console.log(id)

    await api.post(`/groups_page/add/${id}/${user_id}`)

  }

  return (
    <Container>
      <Panel>
        <span className="title">Grupos que não participo :| </span>
        <ul>
          {allGroups.map((group: TGroup) => (
            <form onSubmit={handleSubmit} >
              <button type="submit" style={{ border: 'none', background: 'none' }} >
                <li
                  key={group.id}
                  onClick={() => handleGroupToAddUser(group.id)}
                >
                  <ProfileCircle src={group.image_url} />
                  <span className="bullet" />
                  <span className="news">
                    <span className="head">{group.name}</span>
                    <span className="subtext">{group.occupation_area}</span>
                  </span>
                </li>
              </button>
            </form>
          ))}
        </ul>
      </Panel>
    </Container>
  );
};

export default TrendingPanel;
