import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import Theme from '../../global-types/TTheme'
import '../../styles/app.css'
import { BirdImg, myFont } from '../../styles/componentsStyles'
import {
	logIn,
	setSuccessNull,
	setMessageEmpty
} from '../../store/slices/usersSlice'
import { IUser } from '../../interfaces/IUser'

const Login: React.FC<Theme> = ({ theme }) => {
	const dispatch = useAppDispatch()
	const usersState = useAppSelector((state) => state.usersSlice)
	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [senha, setSenha] = useState('')
	const [modal, setModal] = useState('')

	function resetInputs() {
		setEmail('')
		setSenha('')
	}

	useEffect(() => {
		if (!usersState.success && usersState.message) {
			setModal(usersState.message)
			setTimeout(() => {
				setModal('')
				dispatch(setSuccessNull())
				dispatch(setMessageEmpty())
			}, 1000)
		}
		if (usersState.success && usersState.message) {
			setModal(usersState.message)
			setTimeout(() => {
				navigate('/home')
				dispatch(setSuccessNull())
			}, 1000)
		}
	}, [
		dispatch,
		navigate,
		usersState,
		usersState.loggedUser,
		usersState.message,
		usersState.success
	])

	function verificarLogin() {
		//verificar preenchimento dos campos
		if (!email || !senha) {
			alert('Favor preencher todos os campos.')
			resetInputs()
			return
		}

		const userLogginRequest: Partial<IUser> = {
			email,
			password: senha
		}

		dispatch(logIn(userLogginRequest))
	}

	return (
		<>
			<style>
				url('https://fonts.googleapis.com/css2?family=Marhey:wght@700&display=swap');
			</style>

			<Grid container>
				<Grid item xs={12} sx={{ height: '7vh' }} />
				<Grid item xs={0} sm={3} />
				<Grid item xs={12} sm={6}>
					<Paper
						sx={{
							backgroundColor: theme.colors.secundary,
							height: '60vh',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							boxShadow: '20px 20px 40px'
						}}
					>
						<Grid container>
							<Grid item xs={3} sm={6}>
								<BirdImg
									src={
										require('../../../src/styles/images/mainImage.svg')
											.default
									}
									alt='mySvgImage'
								/>
							</Grid>
							<Grid item xs={9} sm={6}>
								<Grid item xs={12} sx={{ height: '10vh' }} />
								<Grid
									container
									display='flex'
									justifyContent='center'
									alignItems='center'
									flexDirection='column'
								>
									<Typography>{modal}</Typography>
									<Typography
										sx={{
											fontFamily: 'Marhey',
											fontSize: '3.5vh',
											paddingBottom: '0.5vw'
										}}
									>
										LOGIN
									</Typography>

									<TextField
										value={email}
										onChange={(e) =>
											setEmail(e.target.value)
										}
										id='email'
										label='E-mail'
										variant='outlined'
										sx={{
											margin: 1,
											'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
												{
													borderColor:
														theme.colors.text
												},
											'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
												{
													borderColor:
														theme.colors.primary
												},
											'& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input':
												{
													color: theme.colors.text,
													fontFamily: 'Marhey'
												},
											'& .css-1sumxir-MuiFormLabel-root-MuiInputLabel-root':
												{
													color: theme.colors.text,
													fontFamily: 'Marhey'
												},
											'& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root':
												{
													color: theme.colors.text,
													fontFamily: 'Marhey'
												},
											'& .css-1e4jl5o-MuiFormControl-root-MuiTextField-root':
												{
													fontFamily: 'Marhey'
												}
										}}
									/>
									<TextField
										value={senha}
										onChange={(e) =>
											setSenha(e.target.value)
										}
										type='password'
										id='senha'
										label='Senha'
										variant='outlined'
										sx={{
											margin: 1,
											'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
												{
													borderColor:
														theme.colors.text
												},
											'& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
												{
													borderColor:
														theme.colors.primary
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
										onClick={verificarLogin}
										variant='contained'
										sx={{
											margin: 2,
											borderRadius: '15px',
											backgroundColor:
												theme.colors.primary,
											color: theme.colors.text,
											'&:hover': {
												backgroundColor:
													theme.colors.primary
											},
											'&': {
												fontFamily: myFont
											}
										}}
									>
										OK
									</Button>
									<Link
										to={'/cadastro'}
										style={{
											textDecoration: 'none',
											color: theme.colors.text,
											fontFamily: myFont,
											fontSize: '0.8em'
										}}
									>
										Quero me cadastrar!
									</Link>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
				<Grid item xs={0} sm={3} />
			</Grid>
		</>
	)
}

export default Login
