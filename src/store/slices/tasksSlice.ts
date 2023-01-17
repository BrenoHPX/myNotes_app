import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '../../interfaces/ITask'
import {
	addTask,
	archiveTask,
	deleteTask,
	editTask,
	getAllTasks,
	searchTasks,
	showArchivedTasks,
	unarchiveTasks
} from './thunks/tasksThunks'

interface ITasksState {
	tasks: ITask[]
	editableTask: ITask | null
}

const initialState: ITasksState = {
	tasks: [],
	editableTask: null
}

const tasksSlice = createSlice({
	name: 'tasksSlice',
	initialState,
	reducers: {
		// searchTask: (state, action) => {
		// 	console.log('tasksSlice/reducer/searchTask')
		// 	state.tasks = filteredTasks
		// }
	},
	extraReducers(builder) {
		builder
			.addCase(getAllTasks.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(addTask.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(deleteTask.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(editTask.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(archiveTask.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(unarchiveTasks.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(searchTasks.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
			.addCase(showArchivedTasks.fulfilled, (state, action) => {
				const { data } = action.payload
				state.tasks = data
			})
	}
})

// export const { searchTask } = tasksSlice.actions
export default tasksSlice.reducer
