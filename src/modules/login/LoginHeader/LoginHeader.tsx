// ** MUI Components
import Box from '@mui/material/Box'

// ** Component imports
import {
	GuestLayoutHeader,
	GuestLayoutSubtitle
} from '@/common/modules/guest-layout'

export function LoginHeader() {
	return (
		<Box sx={{mb: 8}}>
			<GuestLayoutHeader>
				Welcome Back
			</GuestLayoutHeader>

			<GuestLayoutSubtitle>
				Please enter your credentials
			</GuestLayoutSubtitle>
		</Box>
	)
}
