// ** MUI Components
import Box from '@mui/material/Box'

// ** Component imports
import {
	GuestLayoutHeader,
	GuestLayoutSubtitle
} from '@/common/modules/guest-layout'

export function ResetPasswordStep1Header() {
	return (
		<Box sx={{mb: 4}}>
			<GuestLayoutHeader>
				Reset Password
			</GuestLayoutHeader>

			<GuestLayoutSubtitle>
				Please, follow the instructions below
			</GuestLayoutSubtitle>
		</Box>
	)
}
