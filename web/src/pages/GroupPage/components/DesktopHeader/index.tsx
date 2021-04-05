import React from 'react';
import { Link } from 'react-router-dom'
import {
    Container,
    ProfileCircle,
    SearchInput,
    Wrapper,
    CaretDownIcon,
    HomeIcon,
    LinkedinIcon,
    NotificationsIcon
} from '../DesktopHeader/styles';

const DesktopHeader: React.FC = () => {
    return (
        <Container>
            <Wrapper>
                <div className="left">
                    <LinkedinIcon />
                </div>
                <div className="right">
                    <nav>
                        <Link style={{ textDecoration: 'none', color: 'var(--color-black)' }} to='/'>
                            <button className="active">
                                <HomeIcon />
                                <span>Sair</span>
                            </button>
                        </Link>
                    </nav>
                </div>
            </Wrapper>
        </Container>
    )
}

export default DesktopHeader;