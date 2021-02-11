import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { TileLayer, Marker, Map } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet'
import { IBGEUFResponse, IBGECITYResponse } from '../../utils/types/types'
import apiIbge from '../../services/apiIbge'
import api from '../../services/api'

import Dropzone from '../../components/Dropzone'

import logo from '../../assets/logo/logo.svg'

import './styles.css'

const CreateGroup = () => {

    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])

    const [selectedUf, setSelectedUF] = useState('0')
    const [selectedCity, setSelectedCity] = useState('0')
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

    const [selectedFile, setSelectedFile] = useState<File>()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
        registration: '',
        birth: '',
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
            password,
            description
        } = formData

        const uf = selectedUf
        const city = selectedCity
        const [latitude, longitude] = selectedPosition

        const data = new FormData()



        data.append('name', name)
        data.append('email', email)
        data.append('whatsapp', whatsapp)
        data.append('registration', registration)
        data.append('birth', birth)
        data.append('password', password)
        data.append('description', description)
        data.append('uf', uf)
        data.append('city', city)
        data.append('latitude', String(latitude))
        data.append('longitude', String(longitude))

        if (selectedFile) {
            data.append('image', selectedFile)
        }

        console.log(data)

        await api.post('users', data)

        history.push('/')

        //alert('Estudante cadastrado com sucesso!')

    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Bora Lá" />

                <Link to="/">
                    <FiArrowLeft />
                Voltar para home
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
                        <select name="uf" id="uf">
                            <option value="">Selecione uma área</option>
                        </select>
                    </div>
                    <div className="field">
                        <legend>
                            <h2>Regras</h2>
                            <span>Fale o comportamento esperado no grupo ;</span>
                        </legend>
                        <textarea
                            name="description"
                            id="description"
                            onChange={handleTextAreaChange}
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <div className="field">
                        <legend>
                            <h2>Descrição</h2>
                            <span>Mostre os objetivos do grupo</span>
                        </legend>
                        <textarea
                            name="description"
                            id="description"
                            onChange={handleTextAreaChange}
                        />
                    </div>
                </fieldset>
                <button type="submit">Cadastrar Grupo</button>

            </form>
        </div>
    )
}

export default CreateGroup