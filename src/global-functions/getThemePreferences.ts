function getThemePreference() {
	return JSON.parse(localStorage.getItem('UserModePreference') || 'light')
}

export default getThemePreference
