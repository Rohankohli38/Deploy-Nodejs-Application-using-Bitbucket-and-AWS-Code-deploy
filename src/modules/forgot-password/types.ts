
export type ForgotPasswordStep = 1 | 2

export type ForgotPasswordFormData = {
	email: string
}

export type ForgotPasswordStep2Payload = {
	email: string
}

export type ForgotPasswordStep1Props = {
	setNextStepPayload: (payload: ForgotPasswordStep2Payload) => void
	activateNextStep: () => void
}

export type ForgotPasswordStep2Props = ForgotPasswordStep2Payload
