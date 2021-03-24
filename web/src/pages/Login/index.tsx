import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'

import logo from '../../assets/logo/logo.svg'

import './styles.css'

const Login = () => {

    const [selectedFile, setSelectedFile] = useState<File>()

    const [dataUser, setDataUser] = useState({
        name: '',
        password: ''
    })

    const history = useHistory()



    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setDataUser({ ...dataUser, [name]: value })

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        //resultado do retorno da api
        const auth = await api.post('groups', dataUser)


        //history.push('/')

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Bora Lá" />

                <Link to="/">
                    <FiArrowLeft />
                Voltar para a Página
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Bora logar :)</h1>
                <fieldset>
                    <div className="field">
                        <label htmlFor="name">Matrícula</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Insira a sua matrícula"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="pass"
                            placeholder="Insira a senha"
                            onChange={handleInputChange}
                        />
                    </div>

                </fieldset>


                <button type="submit">Entrar</button>

            </form>
        </div>
    )
}

export default Login