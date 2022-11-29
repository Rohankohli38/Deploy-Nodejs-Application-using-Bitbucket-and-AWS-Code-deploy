// ** React Imports
import {useState, useEffect} from 'react'

// ** MUI Components
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

// ** Hooks
import {useRouter} from 'next/router'

// ** Third Party Imports
import axiosInstance from 'src/axios'
import {accountConfig} from 'src/configs/account'

// ** Component Imports
import {StepperWrapper} from '@/common/modules/forgot-n-reset-password/StepperWrapper'
import {BackToLoginLink} from '@/common/components/BackToLoginLink'
import {ResetPasswordStep1} from '@/modules/reset-password/ResetPasswordStep1'
import {ResetPasswordStep2} from '@/modules/reset-password/ResetPasswordStep2'

// ** Types imports
import type {ResetPasswordStep} from '@/modules/reset-password/types'
import type {FourStateStatus} from '@/common/types/misc'

export function ResetPasswordRoot() {
	// ** States
	const [activeStep, setActiveStep] = useState<ResetPasswordStep>(1)
	const [status, setStatus] = useState<FourStateStatus>('idle')
	const [error, setError] = useState<string | null>(null)

	const router = useRouter()
	const {token} = router.query

	useEffect(() => {
		setStatus('loading')

		if (token) {
			axiosInstance
				.get(`${accountConfig.userFromTokenEndpoint}/${token}`)
				.then(() => {
					setStatus('succeeded')
					setError(null)
				})
				.catch(e => {
					setStatus('failed')
					const data = e.response?.data

					if (data?.key === 'token') {
						if (data?.message === 'invalid') {
							setError('Invalid reset password link')
						} else if (data?.message === 'expired') {
							setError('The reset password link has expired')
						}
					} else {
						setError('Something went wrong')
					}
				})
		}
	}, [token])

	const getActiveStep = () => {
		if (activeStep === 1) {
			return <ResetPasswordStep1 activateNextStep={() => setActiveStep(2)} />
		} else if (activeStep === 2) {
			return <ResetPasswordStep2 />
		} else {
			return null
		}
	}

	return (
		<Box>
			<Collapse in={status === 'loading'}>
				<Alert severity='info' sx={{mb: 4}}>
					Loading...
				</Alert>
			</Collapse>

			<Collapse in={status === 'failed'}>
				<Alert severity='error' sx={{mb: 4}}>
					<AlertTitle>
						<strong>Error</strong>
					</AlertTitle>

					{error}
				</Alert>

				<BackToLoginLink />
			</Collapse>

			<Collapse in={status === 'succeeded'}>
				<StepperWrapper activeStepKey={2} activeStepCompleted={activeStep === 2} />
				{getActiveStep()}
			</Collapse>
		</Box>
	)
}
