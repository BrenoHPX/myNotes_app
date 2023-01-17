import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { IUser } from '../../../interfaces/IUser'
import { myNotesService } from '../../../web_services'

export const addUser = createAsyncThunk(
	'users/addUser',
	async (user: Partial<IUser>) => {
		try {
			console.log('usersSlice/addUsersTry')
			const resposta = await myNotesService.create(user)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const getAllUsers = createAsyncThunk('users/getAllUsers', async () => {
	try {
		console.log('usersSlice/getAllUsers')
		const resposta = await myNotesService.getAll()
		return resposta.data
	} catch (error) {
		if (error instanceof AxiosError) {
			return error.response!.data
		}
	}
})

export const logIn = createAsyncThunk(
	'users/logIn',
	async (user: Partial<IUser>) => {
		try {
			console.log('usersSlice/logInTry')
			const resposta = await myNotesService.logIn(user)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)
