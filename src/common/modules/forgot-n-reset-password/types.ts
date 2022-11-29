
export type StepKey = 1 | 2

export type Step = {
	stepKey: StepKey
	stepLabel: string
}

export type StepperItemProps = {
	stepNumber: number
	stepLabel: string
	active: boolean
	completed: boolean
}

export type StepperWrapperProps = {
	activeStepKey: StepKey
	activeStepCompleted: boolean
}
