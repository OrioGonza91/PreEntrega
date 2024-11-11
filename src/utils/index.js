import bcrypt from 'bcrypt';
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import { faker } from '@faker-js/faker';

export const createHash = async(password) =>{
    const salts = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salts);
}

export const passwordValidation = async(user,password) => bcrypt.compare(password,user.password);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const generateUsers = (count) => {
    const quantity = Number(count)
    const users = []
    for(let i = 0; i <= quantity; i++){
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            role: i % 3 === 0 ? 'admin' : 'user',
            password: 'coder123',
            pets: []
        }
        users.push(user)
    }
    return users
}

export const generatePets = (count) => {
    const quantity =Number(count)
    const pets = []
    for(let i = 0; i < quantity; i++){
        const pet = {
            name: faker.animal.petName(),
            specie: faker.animal.type(),
            birthDate: faker.date.birthdate(),
            adopted: false,
        }
        pets.push(pet)
    }
    return pets
}

export default __dirname;