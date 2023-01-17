import { ITask } from './ITask'

export interface ITargetTaskDto {
	tUid: string
	uUid: string
	newTask: Partial<ITask>
}
