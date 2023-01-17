//salvar com edit aberto
//index de imports
//regex

import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Box, Button, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import ArchiveIcon from '@mui/icons-material/Archive'
import EditIcon from '@mui/icons-material/Edit'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox'
import { Stack } from '@mui/system'
import Theme from '../../global-types/TTheme'
import {
	myFont,
	StyledTableCell,
	StyledTableRow
} from '../../styles/componentsStyles'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks'
import { useAppDispatch } from '../../store/hooks'
import getAllUsers, { logOut } from '../../store/slices/usersSlice'
import {
	addTask,
	archiveTask,
	deleteTask,
	editTask,
	getAllTasks,
	searchTasks,
	showArchivedTasks,
	unarchiveTasks
} from '../../store/slices/thunks/tasksThunks'
import { editModeOn, editModeOff } from '../../store/slices/appConfigSlice'
import { ITargetTaskDto } from '../../interfaces/ITargetTask.dto'
import ISearchTaskDto from '../../interfaces/ISearchTask.dto'

import { ITask } from '../../interfaces/ITask'

const Home: React.FC<Theme> = ({ theme }) => {
	const dispatch = useAppDispatch()
	const usersState = useAppSelector((state) => state.usersSlice)
	const tasksState = useAppSelector((state) => state.tasksSlice)
	const appConfigState = useAppSelector((state) => state.appConfigSlice)
	const usuarioLogado = usersState.loggedUser
	const navigate = useNavigate()

	const [tituloInput, setTituloInput] = useState('')
	const [tarefaInput, setDescriptionInput] = useState('')
	const [tituloEditModeInput, setTituloEditModeInput] = useState('')
	const [tarefaEditModeInput, setDescriptionEditModeInput] = useState('')
	const [searchInput, setSearchInput] = useState('')

	useEffect(() => {
		// dispatch(getAllUsers())
		dispatch(getAllTasks(usuarioLogado?.uUid!))
	}, [])

	useEffect(() => {
		const searchDto: ISearchTaskDto = {
			uUid: usuarioLogado?.uUid!,
			text: searchInput
		}
		console.log('useEffect/searckTask searchInput:', searchDto)
		dispatch(searchTasks(searchDto))
	}, [searchInput])

	function salvarTarefa() {
		const novaTarefa: Partial<ITargetTaskDto> = {
			uUid: usuarioLogado?.uUid!,
			newTask: {
				title: tituloInput,
				description: tarefaInput
			}
		}

		dispatch(addTask(novaTarefa))

		setTituloInput('')
		setDescriptionInput('')
	}

	const deletarTarefa = (msgUid: string) => {
		// dispatch(
		// 	deleteTask({
		// 		tUid: msgUid,
		// 		uUid: usuarioLogado!.uUid
		// 	} as ITargetTaskDto)
		// )
	}

	function editarTarefaAlvo(tUid: string) {
		dispatch(editModeOn(tUid))
		const targetTask = tasksState.tasks!.find((f) => f.tUid === tUid)
		setTituloEditModeInput(targetTask!.title)
		setDescriptionEditModeInput(targetTask!.description)
	}

	function editarConcluido(tUid: string) {
		dispatch(editModeOff())
		const tUidCreatedDate = tasksState.tasks?.find(
			(f) => f.tUid === tUid
		)?.createdDate

		const editedTask: ITask = {
			title: tituloEditModeInput,
			description: tarefaEditModeInput,
			createdDate: tUidCreatedDate!,
			updateDate: new Date().toUTCString(),
			tUid,
			uUid: usuarioLogado!.uUid!,
			isArchived: false
		}

		dispatch(editTask(editedTask))
		setTituloEditModeInput('')
		setDescriptionEditModeInput('')
	}

	function arquivarTarefa(tUid: string) {
		console.log('home/arquivarTarefa()')

		const taskDto: Partial<ITargetTaskDto> = {
			tUid,
			uUid: usuarioLogado?.uUid
		}

		dispatch(archiveTask(taskDto))
	}

	function desarquivarTarefa(uUid: string) {
		// dispatch(unarchiveTasks(uUid))
		// dispatch(getAllTasks(usuarioLogado?.uUid!))
		const msg = tasksState.tasks.find((f) => f.uUid === uUid)
		alert(`desarquivar ${msg?.title}`)
	}

	function desarquivarTarefas(uUid: string) {
		dispatch(unarchiveTasks(uUid))
		dispatch(getAllTasks(usuarioLogado?.uUid!))
	}

	function mostrarTarefasArquivadas() {
		dispatch(showArchivedTasks(usuarioLogado?.uUid!))
	}

	function logout() {
		console.log(tasksState)
		console.log(usersState)

		navigate('/')
		dispatch(logOut())
	}

	return (
		<>
			{!usuarioLogado && (
				<>
					<Typography variant='h1' textAlign={'center'}>
						Usuário não logado.
					</Typography>
					<Link
						to={'/'}
						style={{
							textDecoration: 'none',
							color: theme.colors.text,
							fontFamily: myFont,
							fontSize: '2em',
							marginLeft: '5vw'
						}}
					>
						Voltar ao Login
					</Link>
				</>
			)}
			{usuarioLogado && (
				<>
					{/* APP BAR --------------------------------------------------------- */}
					<Box
						sx={{
							marginTop: '5vh',
							marginBottom: '2vh',
							textAlign: 'center'
						}}
					>
						<Button
							onClick={logout}
							variant='contained'
							sx={{
								width: '10vw',
								borderRadius: '15px',
								backgroundColor: theme.colors.primary,
								color: theme.colors.text,
								'&:hover': {
									backgroundColor: theme.colors.primary
								},
								'&': {
									fontFamily: myFont
								}
							}}
						>
							Logout
						</Button>
					</Box>

					{/*INPUTS --------------------------------------------------------- */}
					<Stack
						paddingY={2}
						paddingX={2}
						direction='row'
						spacing={2}
						justifyContent='center'
					>
						<TextField
							fullWidth
							id='titulo'
							label='Nova tarefa'
							variant='outlined'
							value={tituloInput}
							onChange={(e) => setTituloInput(e.target.value)}
							sx={{
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.text
									},
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.primary
									},
								'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
									{
										fontFamily: myFont
									}
							}}
						/>
						<TextField
							fullWidth
							id='tarefa'
							label='Descrição da tarefa'
							variant='outlined'
							value={tarefaInput}
							onChange={(e) =>
								setDescriptionInput(e.target.value)
							}
							sx={{
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.text
									},
								'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
									{
										borderColor: theme.colors.primary
									},
								'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
									{
										color: theme.colors.text,
										fontFamily: myFont
									},
								'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
									{
										fontFamily: myFont
									}
							}}
						/>
						<Button
							onClick={salvarTarefa}
							sx={{
								width: '10vw',
								backgroundColor: theme.colors.secundary,
								color: theme.colors.text,
								'&:hover': {
									backgroundColor: theme.colors.primary
								},
								'&': {
									fontFamily: myFont
								}
							}}
							variant='contained'
						>
							Salvar
						</Button>
					</Stack>

					{/* TABLE ----------------------------------------------------------- */}

					<TextField
						fullWidth
						id='search'
						label='Procurar tarefa...'
						variant='outlined'
						onChange={(e) => setSearchInput(e.target.value)}
						sx={{
							width: '30%',
							margin: 2,
							justifySelf: 'center',
							'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
								{
									borderColor: theme.colors.text
								},
							'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
								{
									borderColor: theme.colors.primary
								},
							'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
								{
									color: theme.colors.text,
									fontFamily: myFont
								},
							'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
								{
									color: theme.colors.text,
									fontFamily: myFont
								},
							'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
								{
									color: theme.colors.text,
									fontFamily: myFont
								},
							'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
								{
									fontFamily: myFont
								}
						}}
					/>

					<Button
						color='secondary'
						startIcon={<MoveToInboxIcon />}
						sx={{ width: '100%' }}
						onClick={() => mostrarTarefasArquivadas()}
					>
						Tarefas arquivadas
					</Button>
					<Button
						color='secondary'
						startIcon={<UnarchiveIcon />}
						sx={{ width: '100%' }}
						onClick={() => desarquivarTarefas(usuarioLogado.uUid!)}
					>
						Desarquivar todas as tarefas
					</Button>

					<TableContainer component={Paper}>
						<Table aria-label='customized table'>
							<TableHead>
								<TableRow>
									<StyledTableCell sx={{ width: 110 }}>
										Nº
									</StyledTableCell>
									<StyledTableCell>Título</StyledTableCell>
									<StyledTableCell>Tarefa</StyledTableCell>
									<StyledTableCell
										align='center'
										sx={{ width: 300 }}
									>
										Ações
									</StyledTableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{/* {tasksState.tasks
									?.filter(
										(f) =>
											(f.title
												.toLocaleLowerCase()
												.includes(
													searchInput.toLocaleLowerCase()
												) ||
												f.description
													.toLocaleLowerCase()
													.includes(
														searchInput.toLocaleLowerCase()
													)) &&
											f.uUid === usuarioLogado.uUid &&
											f.isArchived === false
									) */}

								{/* RETORNO DA API FILTRO */}
								{tasksState.tasks!.map((tarefa, index) => (
									<StyledTableRow key={tarefa.tUid}>
										<StyledTableCell
											component='th'
											scope='row'
										>
											{index + 1}
										</StyledTableCell>

										{appConfigState.editableTask ===
											tarefa.tUid && (
											<>
												<StyledTableCell
													component='th'
													scope='row'
												>
													<TextField
														id='tituloEditMode'
														label={tarefa.title}
														variant='outlined'
														value={
															tituloEditModeInput
														}
														onChange={(e) =>
															setTituloEditModeInput(
																e.target.value
															)
														}
														sx={{
															'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
																{
																	borderColor:
																		theme
																			.colors
																			.text
																},
															'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
																{
																	borderColor:
																		theme
																			.colors
																			.primary
																},
															'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
																{
																	color: theme
																		.colors
																		.text,
																	fontFamily:
																		myFont
																},
															'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
																{
																	fontFamily:
																		myFont
																}
														}}
													/>
												</StyledTableCell>
											</>
										)}
										{appConfigState.editableTask !==
											tarefa.tUid && (
											<StyledTableCell>
												{tarefa.title}
											</StyledTableCell>
										)}

										{appConfigState.editableTask ===
											tarefa.tUid && (
											<StyledTableCell>
												<TextField
													id='tarefaEditMode'
													label={tarefa.description}
													variant='outlined'
													value={tarefaEditModeInput}
													onChange={(e) =>
														setDescriptionEditModeInput(
															e.target.value
														)
													}
													sx={{
														'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
															{
																borderColor:
																	theme.colors
																		.text
															},
														'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
															{
																borderColor:
																	theme.colors
																		.primary
															},
														'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
															{
																color: theme
																	.colors
																	.text,
																fontFamily:
																	myFont
															},
														'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
															{
																color: theme
																	.colors
																	.text,
																fontFamily:
																	myFont
															},
														'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
															{
																color: theme
																	.colors
																	.text,
																fontFamily:
																	myFont
															},
														'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
															{
																fontFamily:
																	myFont
															}
													}}
												/>
											</StyledTableCell>
										)}

										{appConfigState.editableTask !==
											tarefa.tUid && (
											<StyledTableCell>
												{tarefa.description}
											</StyledTableCell>
										)}
										{appConfigState.editableTask !==
											tarefa.tUid && (
											<StyledTableCell align='center'>
												<Button
													variant='outlined'
													color='info'
													startIcon={<EditIcon />}
													sx={{ margin: 1 }}
													onClick={() =>
														editarTarefaAlvo(
															tarefa.tUid
														)
													}
												>
													Editar
												</Button>
												<Button
													variant='outlined'
													color='error'
													startIcon={<DeleteIcon />}
													sx={{ margin: 1 }}
													onClick={() =>
														deletarTarefa(
															tarefa.tUid
														)
													}
												>
													Apagar
												</Button>
												{tarefa.isArchived ===
													false && (
													<Button
														variant='outlined'
														color='secondary'
														startIcon={
															<ArchiveIcon />
														}
														sx={{
															width: '100%'
														}}
														onClick={() =>
															arquivarTarefa(
																tarefa.tUid
															)
														}
													>
														Arquivar
													</Button>
												)}
												{tarefa.isArchived === true && (
													<Button
														variant='outlined'
														color='secondary'
														startIcon={
															<UnarchiveIcon />
														}
														sx={{
															width: '100%'
														}}
														onClick={() =>
															desarquivarTarefa(
																tarefa.tUid
															)
														}
													>
														Desarquivar
													</Button>
												)}
											</StyledTableCell>
										)}
										{appConfigState.editableTask ===
											tarefa.tUid && (
											<StyledTableCell align='center'>
												<Button
													variant='outlined'
													color='info'
													sx={{ marginX: 1 }}
													onClick={() =>
														editarConcluido(
															tarefa.tUid
														)
													}
												>
													OK
												</Button>
											</StyledTableCell>
										)}
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
		</>
	)
}

export default Home
