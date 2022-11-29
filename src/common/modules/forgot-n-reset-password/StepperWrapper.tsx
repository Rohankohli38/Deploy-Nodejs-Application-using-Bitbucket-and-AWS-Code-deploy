// ** Mui Imports
import Box from '@mui/material/Box'

// ** Icons Imports
import ArrowRight from '@mui/icons-material/East'

// ** Component imports
import {StepperItem} from './StepperItem'

// ** Type imports
import type {
	Step,
	StepperWrapperProps as Props
} from './types'

const steps: Step[] = [
	{
		stepKey: 1,
		stepLabel: 'Enter your email',
	},
	{
		stepKey: 2,
		stepLabel: 'New password',
	}
]

export function StepperWrapper(props: Props) {
	const {
		activeStepKey,
		activeStepCompleted
	} = props

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center'
			}}
			mb={5}
		>
			{(steps.map(({stepKey, stepLabel}, i) => (
				<>
				{(i != 0) && (
					<ArrowRight sx={{mx: 2}} />
				)}

				<StepperItem
					key={stepKey}
					stepNumber={i + 1}
					stepLabel={stepLabel}
					active={activeStepKey === stepKey}
					completed={activeStepKey > stepKey || (activeStepKey === stepKey && activeStepCompleted)}
				/>
				</>
			)))}
		</Box>
	)
}
