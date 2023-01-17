import { createSlice } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { IUser } from '../../interfaces/IUser'
import { addUser, getAllUsers, logIn } from './thunks/usersThunks'

interface IUserState {
	success: boolean | null
	message: string | undefined
	data: Partial<IUser>[]
	loggedUser: Partial<IUser> | null
	error: AxiosResponse | null
}

const initialState: IUserState = {
	success: null,
	message: undefined,
	data: [],
	loggedUser: null,
	error: null
}

const usersSlice = createSlice({
	name: 'usersSlice',
	initialState,
	reducers: {
		setSuccessNull: (state) => {
			console.log('userSlice/reducer/setSuccessNull')
			state.success = null
		},
		setMessageEmpty: (state) => {
			console.log('userSlice/reducer/setMessageEmpty')
			state.message = ''
		},
		logOut: (state) => {
			console.log('userSlice/reducer/logOut')
			state.loggedUser = null
		}
	},
	extraReducers(builder) {
		builder
			.addCase(addUser.fulfilled, (state, action) => {
				const { success, message } = action.payload
				state.success = success
				state.message = message
				return state
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				const { success, message, data } = action.payload
				state.success = success
				state.message = message
				state.data = data
				return state
			})
			.addCase(logIn.fulfilled, (state, action) => {
				const { success, message, data } = action.payload
				state.success = success
				state.message = message
				if (success) {
					state.loggedUser = { uUid: data.uUid, email: data.email }
				}

				return state
			})
	}
})

export default usersSlice.reducer
export const { setSuccessNull, logOut, setMessageEmpty } = usersSlice.actions
