import React, { useState } from 'react';
import MobileHeader from '../MobileHeader'
import DesktopHeader from '../DesktopHeader'
import AdBanner from '../AdBanner'
import LeftColumn from '../LeftColumn';
import MiddleColumn from '../MiddleColumn';
import RightColumn from '../RightColumn';
import { useParams } from 'react-router-dom'

import { Container } from './styles';
import { TInfo } from '../../../../utils/types/types';

const Layout: React.FC = () => {

    const {
        group_id,
        user_id
    }: any = useParams()

    const info = {
        group_id,
        user_id
    } as TInfo

    return (
        <Container>
            <MobileHeader />
            <DesktopHeader />
            <span>
                <AdBanner />
            </span>
            <main>
                <LeftColumn group_id={info.group_id} user_id={info.user_id} />
                <MiddleColumn group_id={group_id} user_id={user_id} />
                <RightColumn group_id={group_id} user_id={user_id} />  
            </main>
        </Container>
    )
}

export default Layout;