// ** MUI Components
import Box from '@mui/material/Box'

// ** Component imports
import {BackToLoginLink} from '@/common/components/BackToLoginLink'
import {ForgotPasswordStep1Header} from './ForgotPasswordStep1Header'
import {ForgotPasswordStep1Form} from './ForgotPasswordStep1Form'

// ** Type Imports
import type {
	ForgotPasswordStep1Props as Props
} from '@/modules/forgot-password/types'

export function ForgotPasswordStep1(props: Props) {
	return (
		<Box>
			<ForgotPasswordStep1Header />
			<ForgotPasswordStep1Form {...props} />

			<Box sx={{mt: 5}}>
				<BackToLoginLink />
			</Box>
		</Box>
	)
}
