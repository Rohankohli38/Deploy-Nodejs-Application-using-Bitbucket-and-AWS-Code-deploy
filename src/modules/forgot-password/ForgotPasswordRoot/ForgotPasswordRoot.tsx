// ** React Imports
import {useState} from 'react'

// ** Mui Imports
import Box from '@mui/material/Box'

// ** Components Imports
import {StepperWrapper} from '@/common/modules/forgot-n-reset-password/StepperWrapper'
import {ForgotPasswordStep1} from '@/modules/forgot-password/ForgotPasswordStep1'
import {ForgotPasswordStep2} from '@/modules/forgot-password/ForgotPasswordStep2'

// ** Type Imports
import type {
	ForgotPasswordStep as Step,
	ForgotPasswordStep2Payload as Step2Payload
} from '@/modules/forgot-password/types'


export function ForgotPasswordRoot() {
	const [activeStep, setActiveStep] = useState<Step>(1)
	const [step2Payload, setStep2Payload] = useState<Step2Payload>({email: ''})

	const getActiveStep = () => {
		if(activeStep === 1) {
			return (
				<ForgotPasswordStep1
					activateNextStep={() => setActiveStep(2)}
					setNextStepPayload={setStep2Payload}
				/>
			)
		} else if(activeStep === 2) {
			return <ForgotPasswordStep2 {...step2Payload} />
		} else {
			return null
		}
	}

	return (
		<Box className='mapp-content-center'>
			<StepperWrapper
				activeStepKey={1}
				activeStepCompleted={activeStep === 2}
			/>

			{getActiveStep()}
		</Box>
	)
}
