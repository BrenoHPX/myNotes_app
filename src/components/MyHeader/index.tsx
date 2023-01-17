import Switch from 'react-switch'
import {
	MyContainer,
	SwitchContainer,
	Title
} from '../../styles/componentsStyles'

interface Props {
	toggleTheme: any
	checked: boolean
	buttonColor: string
}

const Header: React.FC<Props> = ({ toggleTheme, checked, buttonColor }) => {
	return (
		<>
			<MyContainer>
				<div></div>
				<Title>myNotes</Title>
				<SwitchContainer>
					<Switch
						onChange={toggleTheme}
						checked={checked}
						checkedIcon={false}
						uncheckedIcon={false}
						height={10}
						width={40}
						handleDiameter={20}
						offColor='#333'
						onColor={buttonColor}
						boxShadow={'2px'}
					/>
				</SwitchContainer>
			</MyContainer>
		</>
	)
}

export default Header
