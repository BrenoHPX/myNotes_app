import { ITargetTaskDto } from '../interfaces/ITargetTask.dto'
import ISearchTaskDto from '../interfaces/ISearchTask.dto'
import { ITask } from '../interfaces/ITask'
import { api } from './axios_create'

class TasksDataServices {
	async getAllUserTasks(uUid: string) {
		return await api.get(`/user/${uUid}/tasks`)
	}

	async createTask(userNewTask: Partial<ITargetTaskDto>) {
		return await api.post(`/users/${userNewTask.uUid}/task`, {
			title: userNewTask.newTask!.title,
			description: userNewTask.newTask!.description
		})
	}

	async editTask(editedTask: ITask) {
		console.log('editTask', editedTask.title)

		return await api.put(
			`/users/${editedTask.uUid}/task/${editedTask.tUid}`,
			{
				title: editedTask.title,
				description: editedTask.description
			}
		)
	}

	async deleteTask(targetTask: Partial<ITargetTaskDto>) {
		return await api.delete(
			`/users/${targetTask.uUid}/task/${targetTask.tUid}`
		)
	}

	async archiveTask(targetTask: Partial<ITargetTaskDto>) {
		return await api.put(
			`/users/${targetTask.uUid}/archiveTask/${targetTask.tUid}`
		)
	}

	async unarchiveTask(targetTask: Partial<ITargetTaskDto>) {
		return await api.put(
			`/users/${targetTask.uUid}/unarchiveTask/${targetTask.tUid}`
		)
	}

	async unarchiveTasks(uUid: string) {
		return await api.put(`/users/${uUid}/unarchiveTasks`)
	}

	async searchTasks(textDto: ISearchTaskDto) {
		return await api.put(
			`/users/${textDto.uUid}/searchTextinTasks?text=${textDto.text}`
		)
	}
	async showArchivedTasks(uUid: string) {
		return await api.put(`/users/${uUid}/showArchivedTasks`)
	}

	async showUnarchivedTasks(uUid: string) {
		return await api.put(`/users/${uUid}/showUnarchivedTasks`)
	}
}
const TasksDataService = new TasksDataServices()

export { TasksDataService }
