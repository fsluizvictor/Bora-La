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

    const [idInfo, setIdInfo] = useState<TInfo>()

    setIdInfo(info)

    return (
        <Container>
            <MobileHeader />
            <DesktopHeader />
            <span>
                <AdBanner />
            </span>
            <main>
                <LeftColumn id_group={idInfo?.id_group} id_user={idInfo?.id_user} />
                {/* <MiddleColumn isLoading={isLoading} />
                <RightColumn isLoading={isLoading} /> */}
            </main>
        </Container>
    )
}

export default Layout;