import { createSlice } from '@reduxjs/toolkit'

interface IConfigState {
	editableTask: string | null
}

const initialState: IConfigState = {
	editableTask: null
}

const appConfigSlice = createSlice({
	name: 'appConfigSlice',
	initialState,
	reducers: {
		editModeOn: (state, action) => {
			state.editableTask = action.payload
		},
		editModeOff: (state) => {
			state.editableTask = null
		}
	},
	extraReducers() {}
})

export default appConfigSlice.reducer
export const { editModeOn, editModeOff } = appConfigSlice.actions
