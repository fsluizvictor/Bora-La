import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

import Dropzone from '../../components/Dropzone'

import logo from '../../assets/logo/logo_50.png'

import './styles.css'
import { TInfo } from '../../utils/types/types'

const CreateGroup = () => {

    const {
        id_user
    }: any = useParams()

    const [selectedFile, setSelectedFile] = useState<File>()

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        occupation_area: '',
        rules: '',
    })

    const history = useHistory()



    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })

    }

    function handleTextAreaChangeRules(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })

    }

    function handleTextAreaChangeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const {
            name,
            description,
            occupation_area,
            rules,
        } = formData

        const data = new FormData()

        const now = new Date()
        const date = now.getDate()

        data.append('name', name)
        data.append('description', description)
        data.append('occupation_area', occupation_area)
        data.append('date', String(date))
        data.append('rules', rules)
        data.append('id_user', String(id_user))


        if (selectedFile) {
            data.append('image', selectedFile)
        }

        console.log(data)

        await api.post('groups', data)

        history.push(`/user_page/${id_user}`)

        //alert('Estudante cadastrado com sucesso!')

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Bora Lá" />

                <Link to={`/user_page/${id_user}`}>
                    <FiArrowLeft />
                Voltar para a Página
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Bora fazer um grupo :)</h1>

                <Dropzone onFileUploaded={setSelectedFile} />

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome do Grupo</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="name">Área de Concentração</label>
                        <input
                            type="text"
                            name="occupation_area"
                            id="occupation_area"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <legend>
                            <h2>Regras</h2>
                            <span>Fale o comportamento esperado no grupo ;)</span>
                        </legend>
                        <textarea
                            name="rules"
                            id="rules"
                            placeholder="Coloque as atitudes esperadas por aqui ;)"
                            onChange={handleTextAreaChangeRules}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <legend>
                            <h2>Descrição</h2>
                            <span>Escreva sobre os objetivos do grupo  -_-</span>
                        </legend>
                        <textarea
                            name="description"
                            id="description"
                            placeholder="Coloque o que mais tem haver ;)"
                            onChange={handleTextAreaChangeDescription}
                        />
                    </div>
                </fieldset>
                <button type="submit">Cadastrar Grupo</button>

            </form>
        </div>
    )
}

export default CreateGroup