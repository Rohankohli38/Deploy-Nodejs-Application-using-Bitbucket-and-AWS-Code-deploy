// ** React Imports
import {ReactNode} from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, {BoxProps} from '@mui/material/Box'

// ** Icons Imports
import ArrowLeft from 'mdi-material-ui/ArrowLeft'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({theme}) => ({
	[theme.breakpoints.down('md')]: {
		width: '90vw'
	}
}))

export default function Error500() {
	return (
		<Box className='content-center'>
			<Box sx={{p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
				<BoxWrapper>
					<Typography variant='h5' sx={{mb: 2.5, letterSpacing: '0.18px', fontSize: '1.5rem !important'}}>
						500: Internal Server error
					</Typography>
					<Typography variant='body2'>
						Oops, something went wrong!
					</Typography>
				</BoxWrapper>

				<Link passHref href='/'>
					<Button component='a' variant='outlined' sx={{mt: 4}}>
						<ArrowLeft sx={{mr: 1.5, fontSize: 20}} />
						Back to Home
					</Button>
				</Link>
			</Box>
		</Box>
	)
}

Error500.getLayout = (page: ReactNode) => (
	<BlankLayout>
		{page}
	</BlankLayout>
)
