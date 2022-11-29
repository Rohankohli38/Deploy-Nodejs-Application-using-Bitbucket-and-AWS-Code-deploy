
import {PropsWithActivateNextStep} from '@/modules/reset-password/types'

export type ResetPasswordStep1FormData = {
	password: string
	repeatedPassword: string
}

export type PasswordInstructionProps = {
	checked: boolean
	label: string
}

export type ResetPasswordStep1FormProps = PropsWithActivateNextStep
