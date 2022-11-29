
export type ResetPasswordStep = 1 | 2

export type PropsWithActivateNextStep = {
	activateNextStep: () => void
}

export type ResetPasswordStep1Props = PropsWithActivateNextStep
