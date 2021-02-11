import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { TileLayer, Marker, MapContainer } from 'react-leaflet'
import { IBGEUFResponse } from '../../utils/types/types'
import apiIbge from '../../services/apiIbge'
import api from '../../services/api'


import logo from '../../assets/logo/logo.svg'

import './styles.css'

const CreateUser = () => {

    const [ufs, setUfs] = useState<string[]>([])

    useEffect(() => {
        apiIbge.get<IBGEUFResponse[]>('estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)
            setUfs(ufInitials)
        })
    }, [])

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Bora Lá" />

                <Link to="/">
                    <FiArrowLeft />
                Voltar para home
                </Link>
            </header>
            <form>
                <h1>Cadastro do Estudante :)</h1>

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
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="name">Matrícula</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Data de Nascimento</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="name">Curso</label>
                        <select name="uf" id="uf">
                            <option value="">Selecione um Curso</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <MapContainer center={[-19.4754561, -42.6391334]} zoom={15}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-19.4754561, -42.6391334]} />
                    </MapContainer>


                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
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
                        <textarea value="" />
                    </div>
                </fieldset>
                <button type="submit">Cadastrar estudante</button>

            </form>
        </div>
    )
}

export default CreateUser