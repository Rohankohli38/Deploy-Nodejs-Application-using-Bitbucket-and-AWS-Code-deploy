// ** Next Imports
import Image from 'next/image'

// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = () => {
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				justifyContent: 'center'
			}}
		>
			<Image
				src='/images/logo.png'
				alt='logo'
				width={175}
				height={55}
				style={{
					transform: 'scale(0.7)',
				}}
			/>

			<CircularProgress disableShrink sx={{mt: 6}} />
		</Box>
	)
}

export default FallbackSpinner
