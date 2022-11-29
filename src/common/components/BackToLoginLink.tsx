// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import MuiLink from '@mui/material/Link'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import ArrowLeft from 'mdi-material-ui/ArrowLeft'

export function BackToLoginLink() {
	return (
		<Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
			<Link passHref href='/login'>
				<Typography
					component={MuiLink}
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontFamily: 'Roboto',
						fontWeight: 600,
						color: '#1A1A1A'
					}}
				>
					<ArrowLeft sx={{mr: 1.5, fontSize: 20}} />
					<span>Back to login</span>
				</Typography>
			</Link>
		</Typography>
	)
}
