// ** MUI Components
import Box from '@mui/material/Box'

// ** Styled components
import {
	GuestLayoutHeader,
	GuestLayoutSubtitle
} from '@/common/modules/guest-layout'

export function ForgotPasswordStep1Header() {
	return (
		<Box sx={{mb: 6}}>
			<GuestLayoutHeader>
				Forgot Password?
			</GuestLayoutHeader>

			<GuestLayoutSubtitle>
				No worries we'll send you reset instructions
			</GuestLayoutSubtitle>
		</Box>
	)
}
