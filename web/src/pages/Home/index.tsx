import React from 'react'
import { FiLogIn,FiEdit } from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo/logo.svg'


const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header> 
                    <img src={logo} alt="Bora Lá" />
                </header>

                <main>
                    <h1>Seu fórum de estudos</h1>
                    <p>Ajudamos estudantes a compartilharem ideias de forma eficiente.</p>
                    <div className="buttons-container">
                        <Link to="/">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Entrar</strong>
                        </Link>
                        <Link to="/CreateUser">
                            <span>
                                <FiEdit/> 
                            </span>
                            <strong>Se cadastrar</strong>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home