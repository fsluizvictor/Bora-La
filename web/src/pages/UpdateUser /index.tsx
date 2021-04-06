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

    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [selectedUf, setSelectedUF] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const [selectedFile, setSelectedFile] = useState<File>()

    const [dataUser, setDataUser] = useState<TUser>()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        registration: '',
        birth: '',
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
        apiIbge
            .get<IBGEUFResponse[]>('estados')
            .then(response => {
                const ufInitials = response.data.map(uf => uf.sigla)
                setUfs(ufInitials)
            })
    }, [])

    useEffect(() => {
        apiIbge
            .get<IBGECITYResponse[]>(`estados/${selectedUf}/municipios`)
            .then(response => {
                const cityNames = response.data.map(city => city.nome)
                setCities(cityNames)
            })
    }, [selectedUf])


    console.log(id_user)

    useEffect(() => {
        api.get(`users/${id_user}`).then(response => {
            setDataUser(response.data)
        })
    }, [])

    console.log(dataUser)

    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value
        setSelectedUF(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)
    }

    function handleMapOnClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

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
            registration,
            birth,
            course,
            password,
            description
        } = formData

        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition

        const data = {
            name,
            email,
            whatsapp,
            registration,
            birth,
            course,
            password,
            description,
            uf,
            city,
            latitude,
            longitude
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
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">Matrícula</label>
                            <input
                                type="text"
                                name="registration"
                                id="registration"
                                defaultValue={dataUser?.registration}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Data de Nascimento</label>
                            <input
                                type="date"
                                name="birth"
                                id="birth"
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
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map
                        center={InicialPosition}
                        zoom={15}
                        onclick={handleMapOnClick}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="">Estado (UF)</label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUF}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
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


