import UserController from '../src/controller/UserController'

describe('testing create user', () => {
    test('T1', async () => {
        const userController = new UserController()
        const user = userController.create({
            name: "Luiz Victor",
            image: "",
            registration: "",
            city: "",
            uf: "",
            latitude: 192812982918,
            longitude: 823793824938,
            birth: 10 / 08 / 1998,
            course: "",
            email: "",
            password: "",
            description: "",
            whatsapp: "",
        }
    })
})