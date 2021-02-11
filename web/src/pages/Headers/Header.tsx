import React from 'react'
import { THeaderProps } from '../../utils/types/types'
//React.FC == Tipo Genérico que pode receber parâmetros


const Header: React.FC<THeaderProps> = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}

export default Header