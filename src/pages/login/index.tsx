// ** React Imports
import type {ReactNode} from 'react'

// ** Next Imports
import Head from 'next/head'

// ** Component imports
import {GuestLayout} from '@/common/layouts/GuestLayout'
import {LoginRoot} from '@/modules/login'

export default function LoginPage() {
	return (
		<>
		<Head>
			<title>Login</title>
		</Head>

		<LoginRoot />
		</>
	)
}

LoginPage.guestGuard = true
LoginPage.getLayout = (page: ReactNode) => (
	<GuestLayout>
		{page}
	</GuestLayout>
)
