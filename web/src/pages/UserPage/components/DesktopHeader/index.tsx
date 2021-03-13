import React from 'react';
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
                    <SearchInput placeholder="Pesquisar" />
                </div>
                <div className="right">
                    <nav>
                        <button className="active">
                            <HomeIcon />
                            <span>Início</span>
                        </button>
                        <button>
                            <NotificationsIcon />
                            <span>Notificações</span>
                        </button>
                        <button>
                            <ProfileCircle src="https://github.com/fsluizvictor.png" />
                            <span>
                                Eu <CaretDownIcon />
                            </span>
                        </button>
                    </nav>
                </div>
            </Wrapper>
        </Container>
    )
}

export default DesktopHeader;