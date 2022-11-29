// ** React Imports
import type {ReactNode} from 'react'

// ** Next Imports
import Head from 'next/head'
import {Router} from 'next/router'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import {CacheProvider} from '@emotion/react'
import type {EmotionCache} from '@emotion/cache'

// ** Config Imports
import {defaultACLObj} from 'src/configs/acl'
import themeConfig from 'src/configs/themeConfig'

// ** Third Party Import
import {Toaster} from 'react-hot-toast'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import AclGuard from 'src/@core/components/auth/AclGuard'
import ThemeComponent from 'src/@core/theme/ThemeComponent'
import AuthGuard from 'src/@core/components/auth/AuthGuard'
import GuestGuard from 'src/@core/components/auth/GuestGuard'
import WindowWrapper from 'src/@core/components/window-wrapper'

// ** Spinner Import
import Spinner from 'src/@core/components/spinner'

// ** Contexts
import {AuthProvider} from 'src/context/AuthContext'
import {
	SettingsConsumer,
	SettingsProvider
} from 'src/@core/context/settingsContext'

// ** Styled Components
import ReactHotToast from 'src/@core/styles/libs/react-hot-toast'

// ** Utils Imports
import {createEmotionCache} from 'src/@core/utils/create-emotion-cache'

// ** Prismjs Styles
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'

// ** Pace Loader
if (themeConfig.routingLoader) {
	Router.events.on('routeChangeStart', () => {
		NProgress.start()
	})
	Router.events.on('routeChangeError', () => {
		NProgress.done()
	})
	Router.events.on('routeChangeComplete', () => {
		NProgress.done()
	})
}

type GuardProps = {
	authGuard: boolean
	guestGuard: boolean
	children: ReactNode
}

const Guard = (props: GuardProps) => {
	const {children, authGuard, guestGuard} = props

	if(guestGuard) {
		return (
			<GuestGuard fallback={<Spinner />}>
				{children}
			</GuestGuard>
		)
	} else if(authGuard) {
		return (
			<AuthGuard fallback={<Spinner />}>
				{children}
			</AuthGuard>
		)
	} else {
		return <>{children}</>
	}
}

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
	Component: NextPage
	emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()

// ** Configure JSS & ClassName
export default function App(props: ExtendedAppProps) {
	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps
	} = props

	const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)
	const setConfig = Component.setConfig ?? undefined

	const authGuard = Component.authGuard ?? true
	const guestGuard = Component.guestGuard ?? false

	const aclAbilities = Component.acl ?? defaultACLObj

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Mapp</title>
				<meta name='description' content='Mapp description' />
				<meta name='keywords' content='Map, map' />
				<meta name='viewport' content='initial-scale=1, width=device-width' />
			</Head>

			<AuthProvider>
				<SettingsProvider {...(setConfig ? {pageSettings: setConfig()} : {})}>
				<SettingsConsumer>
					{({settings}) => (
						<ThemeComponent settings={settings}>
							<WindowWrapper>
								<Guard authGuard={authGuard} guestGuard={guestGuard}>
									<AclGuard
										aclAbilities={aclAbilities}
										guestGuard={guestGuard}
									>
										{getLayout(<Component {...pageProps} />)}
									</AclGuard>
								</Guard>
							</WindowWrapper>
							<ReactHotToast>
								<Toaster
									position={settings.toastPosition}
									toastOptions={{className: 'react-hot-toast'}}
								/>
							</ReactHotToast>
						</ThemeComponent>
					)}
				</SettingsConsumer>
				</SettingsProvider>
			</AuthProvider>
		</CacheProvider>
	)
}
