// ** MUI Components
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Component imports
import {BackToLoginLink} from '@/common/components/BackToLoginLink'
import {GuestLayoutHeader} from '@/common/modules/guest-layout'

import axiosInstance from 'src/axios'
import toast from 'react-hot-toast'

// ** Config Imports
import {accountConfig} from 'src/configs/account'

// ** Type imports
import type {AxiosResponse} from 'axios'
import type {
	ForgotPasswordStep2Props as Props
} from '@/modules/forgot-password/types'


export function ForgotPasswordStep2(props: Props) {
	const {email} = props

	const handleResendEmailClick = () => {
		const resendEmailPromise = axiosInstance
			.post(accountConfig.forgotPassEndpoint, {email})

		toast.promise(resendEmailPromise, {
			loading: 'Processing...',
			success: 'Email resent',
			error: (e: AxiosResponse) => {
				if(e.status >= 500 && e.status <= 599) {
					return 'Some Internal server error'
				} else {
					return 'Something went wrong'
				}
			}
		})
	}

	return (
		<Box>
			<Box sx={{mt: 6}}>
				<GuestLayoutHeader>
					Verification Sent
				</GuestLayoutHeader>

				<Typography variant='body2' color='secondary.dark'>
					Please, check your email and follow the instructions in the link.
					You didn't receive any email?

					<Typography
						component={MuiLink}
						sx={{
							display: 'inline-block',
							color: 'primary.main',
							cursor: 'pointer',
							ml: 2
						}}
						onClick={handleResendEmailClick}
					>
						<span>Resend Here</span>
					</Typography>
				</Typography>
			</Box>

			<Box sx={{mt: 5}}>
				<BackToLoginLink />
			</Box>
		</Box>
	)
}
