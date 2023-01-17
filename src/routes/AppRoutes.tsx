import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cadastro from '../pages/cadastro/Cadastro'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'

interface Props {
	theme: any
}
export const AppRoutes: React.FC<Props> = ({ theme }) => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Login theme={theme} />} />
				<Route path='/cadastro' element={<Cadastro theme={theme} />} />
				<Route path='/home' element={<Home theme={theme} />} />
				<Route path='*' element={<h1>Não Encontrado</h1>} />
			</Routes>
		</BrowserRouter>
	)
}
