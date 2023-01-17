import { IUser } from '../interfaces/IUser'
import { api } from './index'

class UsersDataServices {
	async getAll() {
		return await api.get('/users')
	}

	async getOne(uUid: string) {
		return await api.get(`/users/${uUid}`)
	}

	async create(user: Partial<IUser>) {
		return await api.post('/users', {
			// name: user.name,
			// username: user.username,
			email: user.email,
			password: user.password
		})
	}

	async logIn(user: Partial<IUser>) {
		return await api.post('/users/logIn', {
			email: user.email,
			password: user.password
		})
	}

	async editOne(codigo: string) {
		return await api.put(`/growdever/${codigo}`)
	}

	async deleteOne(codigo: string) {
		return await api.delete(`/growdever/${codigo}`)
	}
}
const myNotesService = new UsersDataServices()

export { myNotesService }
