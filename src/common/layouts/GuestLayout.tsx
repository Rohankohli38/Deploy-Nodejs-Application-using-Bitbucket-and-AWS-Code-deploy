// ** React Imports
import {ReactNode} from 'react'

// ** Next Imports
import Image from 'next/image'

// ** MUI Components
import Box, {BoxProps} from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import {styled, useTheme} from '@mui/material/styles'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'


const LayoutRoot = styled(Box)<BoxProps>({
	display: 'flex',
	minHeight: '100vh',
	overflowX: 'hidden',
	position: 'relative'
})

const LeftWrapper = styled(Box)<BoxProps>(({theme}) => ({
	width: '100%',
	[theme.breakpoints.up('md')]: {
		marginRight: 50,
		maxWidth: 400
	},
	[theme.breakpoints.up('lg')]: {
		marginRight: 50,
		maxWidth: 450
	}
}))

const LeftRoot = styled(Box)<BoxProps>(() => ({
	height: '100%',
}))

const LogoWrapper = styled(Box)<BoxProps>({
	paddingTop: 40,
	paddingLeft: 30
})

const ContentWrapper = styled(Box)<BoxProps>({
	display: 'flex',
	justifyContent: 'center',
	padding: 28,
	'& > *': {
		width: '100%',
		maxWidth: 450,
	},
	'& .mapp-content-center': {
		marginTop: 75
	}
})

const RightWrapper = styled(Box)<BoxProps>({
	position: 'relative',
	overflow: 'hidden',
	flexGrow: 1
})

const StyledMapIllustration = styled('img')({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	objectFit: 'cover'
})

export function GuestLayout(props: {children: ReactNode}) {
	const {children} = props

	// ** hooks
	const theme = useTheme()
	const hidden = useMediaQuery(theme.breakpoints.down('md'))

	return (
		<BlankLayout>
			<LayoutRoot>
				<LeftWrapper>
					<LeftRoot>
						<LogoWrapper>
							<Image
								src='/images/logo.png'
								alt='logo'
								width={175}
								height={55}
								style={{
									transform: 'scale(0.8)',
									transformOrigin: '0% 50%',
								}}
							/>
						</LogoWrapper>

						<ContentWrapper>
							{children}
						</ContentWrapper>
					</LeftRoot>
				</LeftWrapper>

				{(!hidden) ? (
					<RightWrapper>
						<StyledMapIllustration
							alt='map-illustration'
							src={`/images/map-illustration.png`}
						/>
					</RightWrapper>
				) : null}
			</LayoutRoot>
		</BlankLayout>
	)
}
