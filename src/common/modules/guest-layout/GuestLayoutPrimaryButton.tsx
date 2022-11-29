import {ReactNode} from 'react'

// ** MUI Components
import Button, {ButtonProps} from '@mui/material/Button'
import {styled} from '@mui/material/styles'

const StyledButton = styled(Button)<ButtonProps>({
	padding: '0.8rem 0',
	borderRadius: 0,
	boxShadow: 'none !important',
	fontFamily: 'Roboto',
	fontWeight: 300,
	fontSize: '20px',
	color: '#1A1A1A'
})

type Props = ButtonProps & {
	children: ReactNode
}

export function GuestLayoutPrimaryButton(props: Props) {
	const {children, ...restProps} = props

	return (
		<StyledButton {...restProps}>
			{children}
		</StyledButton>
	)
}
