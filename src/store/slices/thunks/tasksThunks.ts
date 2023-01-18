import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import ITargetTaskDto from '../../../interfaces/ISearchTask.dto'
import ISearchTaskDto from '../../../interfaces/ISearchTask.dto'
import { ITask } from '../../../interfaces/ITask'
import { TasksDataService } from '../../../web_services/TasksDataServices'

export const getAllTasks = createAsyncThunk(
	'tasks/allTasks',
	async (uUid: string) => {
		console.log('tasksSlice/getAllTasks')
		try {
			const resposta = await TasksDataService.getAllUserTasks(uUid)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const addTask = createAsyncThunk(
	'tasks/addTask',
	async (userNewTask: Partial<ITargetTaskDto>) => {
		try {
			const resposta = await TasksDataService.createTask(userNewTask)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const editTask = createAsyncThunk(
	'tasks/editTask',
	async (editedTask: ITask) => {
		try {
			const resposta = await TasksDataService.editTask(editedTask)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const deleteTask = createAsyncThunk(
	'tasks/deleteTask',
	async (targetTask: Partial<ITargetTaskDto>) => {
		try {
			const resposta = await TasksDataService.deleteTask(targetTask)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const archiveTask = createAsyncThunk(
	'tasks/archiveTask',
	async (targetTask: Partial<ITargetTaskDto>) => {
		try {
			console.log('tasksSlice/archiveTask')
			const resposta = await TasksDataService.archiveTask(targetTask)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const unarchiveTask = createAsyncThunk(
	'tasks/unarchiveTask',
	async (targetTask: Partial<ITargetTaskDto>) => {
		try {
			console.log('tasksSlice/unarchiveTask')
			const resposta = await TasksDataService.unarchiveTask(targetTask)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const unarchiveTasks = createAsyncThunk(
	'tasks/unarchiveTask',
	async (uUid: string) => {
		try {
			console.log('tasksSlice/unarchiveTasks')
			const resposta = await TasksDataService.unarchiveTasks(uUid)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const searchTasks = createAsyncThunk(
	'tasks/searchTask',
	async (searchDto: ISearchTaskDto) => {
		try {
			console.log('tasksSlice/searchTasks')
			const resposta = await TasksDataService.searchTasks(searchDto)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)

export const showArchivedTasks = createAsyncThunk(
	'tasks/showArchivedTasks',
	async (uUid: string) => {
		try {
			console.log('tasksSlice/showArchivedTasks')
			const resposta = await TasksDataService.showArchivedTasks(uUid)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)
export const showUnarchivedTasks = createAsyncThunk(
	'tasks/showUnarchivedTasks',
	async (uUid: string) => {
		try {
			console.log('tasksSlice/showUnarchivedTasks')
			const resposta = await TasksDataService.showUnarchivedTasks(uUid)
			return resposta.data
		} catch (error) {
			if (error instanceof AxiosError) {
				return error.response!.data
			}
		}
	}
)
