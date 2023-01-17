import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string

		colors: {
			tableRowLight: string
			tableRowDark: string
			primary: string
			secundary: string

			background: string
			text: string
		}
	}
}
