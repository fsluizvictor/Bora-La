import React from 'react'
import { FiLogIn,FiEdit } from 'react-icons/fi'
import {Link} from 'react-router-dom'

import './styles.css'

import logo from '../../assets/logo/logo_50.png'


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
                        <Link to="/login">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Entrar</strong>
                        </Link>
                        <Link to="/CreateUser">
                            <span>
                                <FiEdit/> 
                            </span>
                            <strong>Cadastrar</strong>
                        </Link>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Home