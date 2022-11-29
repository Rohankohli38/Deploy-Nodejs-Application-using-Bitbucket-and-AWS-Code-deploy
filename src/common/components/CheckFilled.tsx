// ** MUI Components
import Box from '@mui/material/Box'

// ** Icons
import CheckIcon from '@mui/icons-material/Check'

export function CheckFilled() {
	return (
		<Box sx={{
			display: 'inline-grid',
			placeItems: 'center',
			width:  '1.3rem',
			height: '1.3rem',
			mr: 2,
			backgroundColor: 'success.main',
			borderRadius: '50%'
		}}>
			<CheckIcon sx={{fontSize: '0.9rem', color: 'white'}} />
		</Box>
	)
}
