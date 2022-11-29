// ** MUI Components
import Box from '@mui/material/Box'

// ** Component imports
import {LoginHeader} from '@/modules/login/LoginHeader'
import {LoginForm} from '@/modules/login/LoginForm'

export function LoginRoot() {
	return (
		<Box className='mapp-content-center'>
			<LoginHeader />
			<LoginForm />
		</Box>
	)
}
