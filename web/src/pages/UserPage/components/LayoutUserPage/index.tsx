import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import MobileHeader from '../MobileHeader'
import DesktopHeader from '../DesktopHeader'
import AdBanner from '../AdBanner'
import LeftColumn from '../LeftColumn';
import MiddleColumn from '../MiddleColumn';
import RightColumn from '../RightColumn';

import { Container } from './styles';

const LayoutUserPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)

    const {
        user_id
    }: any = useParams()

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1000)
    }, [])

    return (
        <Container>
            <MobileHeader />
            <DesktopHeader />
            <span>
                <AdBanner />
            </span>
            <main>
                <LeftColumn user_id={user_id} />
                <MiddleColumn user_id={user_id} />
                <RightColumn />
            </main>
        </Container>
    )
}

export default LayoutUserPage;