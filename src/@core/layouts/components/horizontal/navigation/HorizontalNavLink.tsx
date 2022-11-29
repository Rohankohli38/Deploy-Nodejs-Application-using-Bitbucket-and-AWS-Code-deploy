// ** React Imports
import {ElementType, Fragment} from 'react'

// ** Next Imports
import Link from 'next/link'
import {useRouter} from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import ListItemIcon from '@mui/material/ListItemIcon'
import MuiListItem, {ListItemProps} from '@mui/material/ListItem'

// ** Third Party Imports
import clsx from 'clsx'

// ** Theme Config Import
import themeConfig from 'src/configs/themeConfig'

// ** Types
import {NavLink} from 'src/@core/layouts/types'
import {Settings} from 'src/@core/context/settingsContext'

// ** Custom Components Imports
import UserIcon from 'src/layouts/components/UserIcon'
import Translations from 'src/layouts/components/Translations'
import CanViewNavLink from 'src/layouts/components/acl/CanViewNavLink'

interface Props {
	item: NavLink
	settings: Settings
	hasParent: boolean
}

const ListItem = styled(MuiListItem)<ListItemProps & {component?: ElementType; target?: '_blank' | undefined}>(
	({theme}) => ({
		width: 'auto',
		paddingTop: theme.spacing(2.25),
		color: theme.palette.text.primary,
		padding: 0,
		paddingBottom: '12px',
		margin: '8px 8px 0',

		'& .MuiTypography-root': {
			margin: 0,
			width: '0px',
			transition: '0.1s ease-in',
		},
		'&:hover .MuiTypography-root': {
			marginLeft: 3,
			width: '100%'
		}
	})
)

const HorizontalNavLink = (props: Props) => {
	// ** Props
	const {item, hasParent} = props

	// ** Hook & Vars
	const router = useRouter()
	const {navSubItemIcon, menuTextTruncate} = themeConfig

	const IconTag = item.icon ? item.icon : navSubItemIcon

	const Wrapper = !hasParent ? List : Fragment

	const handleURLQueries = () => {
		if (Object.keys(router.query).length && item.path) {
			const arr = Object.keys(router.query)

			return router.asPath.includes(item.path) && router.asPath.includes(router.query[arr[0]] as string)
		}
	}

	const isNavLinkActive = () => {
		if (router.pathname === item.path || handleURLQueries()) {
			return true
		} else {
			return false
		}
	}

	return (
		<CanViewNavLink navLink={item}>
			<Wrapper
				{...(!hasParent ? {component: 'div'} : {})}
			>
				<Link href={`${item.path}`} passHref>
					<ListItem
						component={'a'}
						disabled={item.disabled}
						className={clsx({active: isNavLinkActive()})}
						target={item.openInNewTab ? '_blank' : undefined}
						onClick={e => {
							if (item.path === undefined) {
								e.preventDefault()
								e.stopPropagation()
							}
						}}
						sx={{
							...(item.disabled ? {pointerEvents: 'none'} : {cursor: 'pointer'}),
							...(!hasParent ? {
								borderRadius: '0',
								'&.active, &.active:hover': {
									borderBottom: '3px solid #F08339',
								}
							} : {})
						}}
					>

						<Box sx={{
							width: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between'
						}}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									...(menuTextTruncate && {overflow: 'hidden'})
								}}
							>
								<ListItemIcon sx={{color: 'text.primary', margin: 0}}>
									<UserIcon
										icon={IconTag}
										componentType='horizontal-menu'
										iconProps={{sx: IconTag === navSubItemIcon ? {fontSize: '0.5rem'} : {}}}
									/>
								</ListItemIcon>

								<Typography sx={{ml: hasParent ? 3 : 2.5}} {...(menuTextTruncate && {noWrap: true})}>
									<Translations text={item.title} />
								</Typography>
							</Box>

							{item.badgeContent ? (
								<Chip
									size='small'
									label={item.badgeContent}
									color={item.badgeColor || 'primary'}
									sx={{ml: 1.5, '& .MuiChip-label': {px: 2.5, lineHeight: 1.385, textTransform: 'capitalize'}}}
								/>
							) : null}
						</Box>
					</ListItem>
				</Link>
			</Wrapper>
		</CanViewNavLink>
	)
}

export default HorizontalNavLink
