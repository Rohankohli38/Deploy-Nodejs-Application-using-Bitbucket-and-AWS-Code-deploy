// ** React imports
import type {ReactNode} from 'react'

// ** Next imports
import Head from 'next/head'

// ** Component imports
import {GuestLayout} from '@/common/layouts/GuestLayout'
import {ForgotPasswordRoot} from '@/modules/forgot-password'

export default function ForgotPasswordPage() {
	return (
		<>
		<Head>
			<title>Forgot password</title>
		</Head>

		<ForgotPasswordRoot />
		</>
	)
}

ForgotPasswordPage.guestGuard = true
ForgotPasswordPage.getLayout = (page: ReactNode) => (
	<GuestLayout>
		{page}
	</GuestLayout>
)
