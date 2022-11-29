// ** MUI Components
import Typography from '@mui/material/Typography'

// **Icons
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'

// ** Component imports
import {CheckFilled} from '@/common/components/CheckFilled'

// ** Types imports
import {
	PasswordInstructionProps as Props
} from './types'

export function PasswordInstruction(props: Props) {
	const {
		checked,
		label
	} = props

	return (
		<Typography variant='body2'
			sx={{
				my: 2,
				ml: 0,
				display: 'flex',
				alignItems: 'center',
				color: checked ? 'secondary' : '#EFEFEF'
			}}
		>
			{checked
				? <CheckFilled />
				: <CheckCircleOutlineIcon fontSize='medium' sx={{ml: 0, mr: 2}} />
			}
			{label}
		</Typography>
	)
}
