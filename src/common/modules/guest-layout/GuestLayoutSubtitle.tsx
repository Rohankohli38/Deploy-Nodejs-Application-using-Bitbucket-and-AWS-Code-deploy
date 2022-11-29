import {ReactNode} from 'react'

// ** MUI Components
import Typography, {TypographyProps} from '@mui/material/Typography'
import {styled} from '@mui/material/styles'

const StyledTypography = styled(Typography)<TypographyProps>({
	color: '#E6E6E6',
})

type Props = TypographyProps & {
	children: ReactNode
}

export function GuestLayoutSubtitle(props: Props) {
	const {children, ...restProps} = props

	return (
		<StyledTypography variant='body2' {...restProps}>
			{children}
		</StyledTypography>
	)
}
