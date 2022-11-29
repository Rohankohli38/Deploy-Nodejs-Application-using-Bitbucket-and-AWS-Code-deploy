// ** MUI Components
import Box from '@mui/material/Box'

// ** Component imports
import {ResetPasswordStep1Header} from './ResetPasswordStep1Header'
import {ResetPasswordStep1Form} from './ResetPasswordStep1Form'
import {BackToLoginLink} from '@/common/components/BackToLoginLink'

// ** Types imports
import type {
	ResetPasswordStep1Props as Props
} from '@/modules/reset-password/types'

export function ResetPasswordStep1(props: Props) {
	return (
		<Box>
			<ResetPasswordStep1Header />
			<ResetPasswordStep1Form {...props} />

			<Box sx={{mt: 5}}>
				<BackToLoginLink />
			</Box>
		</Box>
	)
}
