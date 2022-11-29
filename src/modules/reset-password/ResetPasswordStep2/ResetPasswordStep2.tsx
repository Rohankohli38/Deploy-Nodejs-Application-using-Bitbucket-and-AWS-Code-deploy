// ** Next imports
import {useRouter} from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'

import {
	GuestLayoutHeader,
	GuestLayoutPrimaryButton
} from '@/common/modules/guest-layout'

export function ResetPasswordStep2() {
	const router = useRouter()

	return (
		<Box>
			<Box sx={{mt: 6, mb: 8}}>
				<GuestLayoutHeader>
					Password changed successfully!
				</GuestLayoutHeader>
			</Box>

			<GuestLayoutPrimaryButton
				fullWidth
				variant='contained'
				href='/login'
				onClick={(e) => {e.preventDefault(); router.replace('/login')}}
			>
				Back to Login
			</GuestLayoutPrimaryButton>
		</Box>
	)
}
