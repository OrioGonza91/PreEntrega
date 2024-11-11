import { petsService, usersService } from "../services/index.js"
import { generateUsers, generatePets } from "../utils/index.js"

const getUserMocking = (req, res) => {
    const { count } = req.query
    if(!count || !Number(count)){
        return res.status(404).send({ message: 'Error al momento de recibir una cantidad' })  
    } 
    
    const users = generateUsers(count)
    res.send({ message: 'done', payload: users })
}

const getPetMocking = (req, res) => {
    const { count } = req.query
    if(!count || !Number(count)){
        return res.status(404).send({ message: 'Error al momento de recibir una cantidad' })  
    } 
    
    const pets = generatePets(count)
    res.send({ message: 'done', payload: pets })
}

const generateData = async (req, res) => {
    const { countUsers, countPets } = req.body
    if(!countUsers || !Number(countUsers) || !countPets || !Number(countPets)){
        return res.status(404).send({ message: 'Error al momento de recibir una cantidad' })
    }
    const users = generateUsers(countUsers)
    try {
        for (const user of users) {
            await usersService.create(user)
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error al momento de crear un usuario' })
    }
    const pets = generatePets(countPets)
    try {
        for (const pet of pets) {
            await petsService.create(pet)
        }
    } catch (error) {
        return res.status(500).send({ message: 'Error al momento de crear una mascota' })
    }

    res.send({ message: 'Creados los usuarios y mascotas con exito', payload: users })
}

export default {
    getUserMocking,
    getPetMocking,
    generateData
}