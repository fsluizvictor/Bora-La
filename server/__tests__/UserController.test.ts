import routes from '../src/routes'
import request from 'supertest'
import { HTTP_CREATED, HTTP_NO_CONTENT, HTTP_SUCCESS } from '../src/utils/consts'
import server from '../src/server'

describe('testing create user', () => {

    it('T1', async () => {

        const user = await request(server)
            .post('/users')
            .send({
                name: "Luiz Victor",
                registration: 20183014317,
                city: "Coronel Fabriciano",
                uf: "MG",
                latitude: "192812982918",
                longitude: "823793824938",
                birth: "10/08/1998",
                course: "Engenharia de Computação",
                email: "fs.luizvictor@gmail.com",
                password: "12345678",
                description: "Eu sou aluno do curso de ...",
                whatsapp: "03199999999"
            })

        expect(user.status).toEqual(HTTP_CREATED)

        expect(user.body).toEqual({
            name: "Luiz Victor",
            registration: 20183014317,
            city: "Coronel Fabriciano",
            uf: "MG",
            latitude: "192812982918",
            longitude: "823793824938",
            birth: "10/08/1998",
            course: "Engenharia de Computação",
            email: "fs.luizvictor@gmail.com",
            password: "12345678",
            description: "Eu sou aluno do curso de ...",
            whatsapp: "03199999999"
        })



    })

    it('T2', async () => {

        const user = await request(server)
            .post('/users')
            .send({
                name: null,
                registration: null,
                city: null,
                uf: null,
                latitude: null,
                longitude: null,
                birth: null,
                course: null,
                email: null,
                password: null,
                description: null,
                whatsapp: null,
            })

        expect(user.status).toEqual(HTTP_NO_CONTENT)

        expect(user.body.error).toBe(undefined)
    })

    it('T3', async () => {

        const user = await request(server)
            .post('/users')
            .send({
                name: "Luiz Victor",
                registration: -3014317,
                city: "Coronel Fabriciano",
                uf: "MG",
                latitude: "192812982918",
                longitude: "823793824938",
                birth: "10/08/1998",
                course: "Engenharia de Computação",
                email: "fs.luizvictor@gmail.com",
                password: "12345678",
                description: "Eu sou aluno do curso de ...",
                whatsapp: "031 99999999999",
            })

        expect(user.status).toEqual(HTTP_NO_CONTENT)

        expect(user.body.error).toBe(undefined)
    })

    it('T4', async () => {

        const user = await request(server)
            .post('/users')
            .send({
                name: "Luiz Victor",
                registration: 1,
                city: "Coronel Fabriciano",
                uf: "MG",
                latitude: "192812982918",
                longitude: "823793824938",
                birth: "10/08/1998",
                course: "Engenharia de Computação",
                email: "fs.luizvictor@gmail.com",
                password: "12345678",
                description: "Eu sou aluno do curso de ...",
                whatsapp: "03199999"
            })

        expect(user.status).toEqual(HTTP_CREATED)

        expect(user.body).toEqual({
            name: "Luiz Victor",
            registration: 1,
            city: "Coronel Fabriciano",
            uf: "MG",
            latitude: "192812982918",
            longitude: "823793824938",
            birth: "10/08/1998",
            course: "Engenharia de Computação",
            email: "fs.luizvictor@gmail.com",
            password: "12345678",
            description: "Eu sou aluno do curso de ...",
            whatsapp: "03199999"
        })


    })
})