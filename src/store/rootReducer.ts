import { combineReducers } from '@reduxjs/toolkit'
import usersSlice from './slices/usersSlice'
import tasksSlice from './slices/tasksSlice'
import appConfigSlice from './slices/appConfigSlice'

export default combineReducers({
	usersSlice,
	tasksSlice,
	appConfigSlice
})
