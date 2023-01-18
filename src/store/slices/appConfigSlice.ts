import { createSlice } from '@reduxjs/toolkit'

interface IConfigState {
	editableTask: string | null
	setArchivedTasks: boolean
}

const initialState: IConfigState = {
	editableTask: null,
	setArchivedTasks: false
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
		},
		setArchivedConfigState: (state, action) => {
			state.setArchivedTasks = action.payload
		}
	},
	extraReducers() {}
})

export default appConfigSlice.reducer
export const { editModeOn, editModeOff, setArchivedConfigState } =
	appConfigSlice.actions
