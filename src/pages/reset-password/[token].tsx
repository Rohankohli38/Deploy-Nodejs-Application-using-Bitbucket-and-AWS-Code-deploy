// ** React imports
import {ReactElement} from 'react'

// ** Next Imports
import Head from 'next/head'

// ** Component Imports
import {GuestLayout} from '@/common/layouts/GuestLayout'
import {ResetPasswordRoot} from '@/modules/reset-password'

export default function ResetPasswordPage() {
	return (
		<>
		<Head>
			<title>Reset Password</title>
		</Head>

		<ResetPasswordRoot />
		</>
	)
}

ResetPasswordPage.guestGuard = true
ResetPasswordPage.getLayout = (page: ReactElement) => (
	<GuestLayout>
		{page}
	</GuestLayout>
)
