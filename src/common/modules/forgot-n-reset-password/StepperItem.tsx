// ** MUI Components
import Typography from '@mui/material/Typography'

// ** Component imports
import {CheckFilled} from '@/common/components/CheckFilled'

// ** Type imports
import type {
	StepperItemProps as Props
} from './types'


export function StepperItem(props: Props) {
	const {
		stepNumber,
		stepLabel,
		active,
		completed
	} = props

	return (
		<Typography
			variant='body2'
			sx={{
				display: 'inline-flex',
				alignItems: 'center',
				my: 0,
				color: (active || completed) ? '#1A1A1A' : '#C7C7C7'
			}}
		>
			{completed
				?  <CheckFilled />
				:  (
					<Typography variant='caption'
						sx={{
							display: 'inline-grid',
							placeItems: 'center',
							width:  22,
							height: 22,
							mr: 2,
							border: '1px solid',
							borderRadius: '50%',
							color: (active) ? '#121212' : '#C7C7C7',
							borderColor: (active) ? 'success.main' : '#C7C7C7'
						}}
					>
						{stepNumber}
					</Typography>
			)}
			{stepLabel}
		</Typography>
	)
}
