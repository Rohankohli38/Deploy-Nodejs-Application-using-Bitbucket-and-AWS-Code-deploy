// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import {styled} from '@mui/material/styles'

// ** Components
import Navigation from '../navigation'

// ** Type Import
import {LayoutProps} from 'src/@core/layouts/types'

const StyledLink = styled('a')(({theme}) => ({
	display: 'flex',
	alignItems: 'center',
	textDecoration: 'none',
	marginRight: theme.spacing(5)
}))

const AppBarContent = (props: LayoutProps) => {
	// ** Props
	const {
		horizontalAppBarContent: userHorizontalAppBarContent,
		horizontalAppBarBranding: userHorizontalAppBarBranding,
		horizontalNavMenuContent: userHorizontalNavMenuContent
	} = props

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between'
			}}
		>

			<Box sx={{
				display: 'flex'
			}}>
				{userHorizontalAppBarBranding
					? userHorizontalAppBarBranding(props)
					: (
						<Link href='/' passHref>
							<StyledLink>
								<img
									src='/images/logo.png'
									alt='logo'
									width={90}
									style={{
										maxWidth: '100%',
										height: 'auto'
									}}
								/>
							</StyledLink>
						</Link>
				)}

				{(userHorizontalNavMenuContent && userHorizontalNavMenuContent(props)) || <Navigation {...props} />}
			</Box>

			{userHorizontalAppBarContent ? (
				userHorizontalAppBarContent(props)
			) : null}
		</Box>
	)
}

export default AppBarContent
