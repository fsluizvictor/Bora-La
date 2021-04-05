import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from '../../../../services/api';
import { TInfo, TUser } from '../../../../utils/types/types';
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
                        <Link style={{ textDecoration: 'none', color: 'var(--color-black)' }} to='/' >
                            <button>
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