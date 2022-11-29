
import * as yup from 'yup'

import {
	MIN_PASSWORD_LENGTH,
	MAX_PASSWORD_LENGTH
} from '@/common/constants'

export const emailSchema = yup.string()
		.required('Required')
		.email('Must be a valid email')

//  should match the regex - /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z\d\s:])([^\s]){6,32}$/g
export const passwordSchema = yup.string()
		.required('Required')
		.matches(/([^\s])/g, 'No space characters')
		.matches(/[A-Z]/g, 'At least one uppercase character required')
		.matches(/[a-z]/g, 'At least one lowercase character required')
		.matches(/\d/g, 'At least one number required')
		.matches(/[^a-zA-Z\d\s]/g, 'At least one special character required')
		.min(MIN_PASSWORD_LENGTH, (o) => `At least ${o.min} characters`)
		.max(MAX_PASSWORD_LENGTH, (o) => `At most ${o.max} characters`)
