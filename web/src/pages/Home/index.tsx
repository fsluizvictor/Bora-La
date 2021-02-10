import React from 'react'
import { FiLogIn } from 'react-icons/fi'

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
                    <p>Ajudamos estudantes a </p>

                    <span>
                        <FiLogIn />
                    </span>
                    <strong>Cadastre um ponto de coleta</strong>

                </main>
            </div>
        </div>
    )
}

export default Home