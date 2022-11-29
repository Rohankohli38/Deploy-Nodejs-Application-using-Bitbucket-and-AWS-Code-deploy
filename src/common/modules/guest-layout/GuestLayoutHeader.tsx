import {ReactNode} from 'react'

// ** MUI Components
import Typography, {TypographyProps} from '@mui/material/Typography'
import {styled} from '@mui/material/styles'

const StyledTypography = styled(Typography)<TypographyProps>(({theme}) => ({
	fontWeight: 700,
	color: '#1A1A1A',
	letterSpacing: '0.18px',
	marginBottom: theme.spacing(1.5)
}))

type Props = TypographyProps & {
	children: ReactNode
}

export function GuestLayoutHeader(props: Props) {
	const {children, ...restProps} = props

	return (
		<StyledTypography variant='h4' {...restProps}>
			{children}
		</StyledTypography>
	)
}
