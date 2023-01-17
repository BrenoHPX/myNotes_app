import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { AppRoutes } from './routes/AppRoutes'
import GlobalStyles from './styles/globalStyles'
import light, { dark } from './styles/themes/light'
import { useState, useEffect } from 'react'
import MyHeader from './components/MyHeader'
import { v4 as uuidv4 } from 'uuid'

const App: React.FC = () => {
	if (!localStorage.getItem('themeStatus')) {
		localStorage.setItem('themeStatus', JSON.stringify(light))
	}

	const themeState = JSON.parse(localStorage.getItem('themeStatus')!)

	const [theme, setTheme] = useState(themeState)
	const [switchCheck, setSwitchCheck] = useState(Boolean(themeState.checked))
	const [toggle, setToggle] = useState('')

	useEffect(() => {
		theme === light ? setTheme(dark) : setTheme(light)
		theme === light ? setSwitchCheck(false) : setSwitchCheck(true)
		localStorage.setItem('themeStatus', JSON.stringify(theme))
	}, [toggle])

	const toggleTheme = () => {
		setToggle(uuidv4())
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyles />
			<MyHeader
				toggleTheme={toggleTheme}
				checked={switchCheck}
				buttonColor={theme.colors.background}
			/>
			<AppRoutes theme={theme} />
		</ThemeProvider>
	)
}

export default App
