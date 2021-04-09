import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { TileLayer, Marker, Map } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { IBGEUFResponse, IBGECITYResponse, TUser, TInfo } from '../../utils/types/types'
import apiIbge from '../../services/apiIbge'
import api from '../../services/api'

import Dropzone from '../../components/Dropzone'

import logo from '../../assets/logo/logo_50.png'

import './styles.css'

const UpdateUser = () => {

    const {
        id_user
    }: any = useParams()

    const [dataUser, setDataUser] = useState<TUser>()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        course: '',
        password: '',
        description: ''
    })


    const [InicialPosition, setInicialPosition] = useState<[number, number]>([0, 0])

    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords

            setInicialPosition([latitude, longitude])
        })
    }, [])


    useEffect(() => {
        api.get(`users/${id_user}`).then(response => {
            setDataUser(response.data)
            setFormData({
                name: dataUser?.name!,
                email: dataUser?.email!,
                whatsapp: dataUser?.whatsapp!,
                course: dataUser?.course!,
                password: dataUser?.password!,
                description: dataUser?.description!
            })
        })
    }, [])

    console.log(dataUser)

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })

    }

    function handleTextAreaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { name, value } = event.target

        setFormData({ ...formData, [name]: value })

    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        const {
            name,
            email,
            whatsapp,
            course,
            password,
            description
        } = formData

        const data = {
            name,
            email,
            whatsapp,
            course,
            password,
            description,
        }

        console.log(data)

        await api.put(`users/${dataUser?.id}`, data)

        history.push(`/user_page/${dataUser?.id}`)

        //alert('Estudante cadastrado com sucesso!')

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Bora Lá" />

                <Link to={`/user_page/${dataUser?.id}`}>
                    <FiArrowLeft />
                Voltar para a Página
                </Link>
            </header>
            <form onSubmit={handleSubmit}>
                <h1>Bora alterar o perfil :)</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                    <div className="field">
                        <label htmlFor="name">Nome Completo</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            defaultValue={dataUser?.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={dataUser?.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                defaultValue={dataUser?.whatsapp}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label htmlFor="name">Curso</label>
                        <input
                            type="text"
                            name="course"
                            id="course"
                            defaultValue={dataUser?.course}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            defaultValue={dataUser?.password}
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <legend>
                            <h2>Descrição</h2>
                            <span>Fale um pouco sobre você :)</span>
                        </legend>
                        <textarea
                            name="description"
                            id="description"
                            defaultValue={dataUser?.description}
                            onChange={handleTextAreaChange}
                        />
                    </div>
                </fieldset>
                <button type="submit">Alterar cadastro</button>

            </form>
        </div>
    )
}

export default UpdateUser;


