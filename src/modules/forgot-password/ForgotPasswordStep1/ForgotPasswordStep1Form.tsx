// ** React Imports
import {useState} from 'react'

// ** MUI Components
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CircularProgress from '@mui/material/CircularProgress'
import {styled} from '@mui/material/styles'

// ** Icons imports
import EmailIcon from '@mui/icons-material/Email'

import * as yup from 'yup'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'

import toast from 'react-hot-toast'
import axiosInstance from 'src/axios'
import {accountConfig} from 'src/configs/account'

// ** Component imports
import {GuestLayoutPrimaryButton} from '@/common/modules/guest-layout'

// ** Type Imports
import type {FourStateStatus} from '@/common/types/misc'
import type {
	ForgotPasswordFormData as FormData,
	ForgotPasswordStep1Props as Props
} from '@/modules/forgot-password/types'

// ** Other imports
import {emailSchema} from '@/common/yup-schemas'


const OutlinedInputStyled = styled(OutlinedInput)({
	'& .MuiOutlinedInput-notchedOutline': {
		borderRadius: 0
	}
})

const schema = yup.object().shape({
	email: emailSchema
})

const defaultValues: FormData = {
	email: ''
}

export function ForgotPasswordStep1Form(props: Props) {
	const {
		setNextStepPayload,
		activateNextStep
	} = props

	const [status, setStatus] = useState<FourStateStatus>('idle')

	const {
		setError,
		control,
		handleSubmit,
		formState: {errors}
	} = useForm({
		defaultValues,
		mode: 'onBlur',
		resolver: yupResolver(schema)
	})

	const onSubmit = (data: FormData) => {
		setStatus('loading')

		axiosInstance
			.post(accountConfig.forgotPassEndpoint, data)
			.then(() => {
				setStatus('succeeded')
				setNextStepPayload({email: data.email})
				activateNextStep()
			})
			.catch(e => {
				setStatus('failed')
				const data = e.response?.data

				if (data?.key === 'email') {
					setError('email', {
						type: 'manual',
						message: 'Invalid email',
						shouldFocus: true
					})
				} else {
					toast.error(e.message)
				}
			})
	}

	return (
		<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<InputLabel
				htmlFor='reset-password-new-password-input'
				error={Boolean(errors.email)}
				sx={{
					mb: 2,
					fontWeight: 500,
					color: '#1A1A1A',
				}}
			>
				Email Address
			</InputLabel>

			<FormControl fullWidth sx={{mb: 6, height: 70}}>
				<Controller
					name='email'
					control={control}
					rules={{required: true}}
					render={({field: {value, onChange, onBlur}}) => (
						<OutlinedInputStyled
							placeholder='email'
							value={value}
							onBlur={onBlur}
							onChange={onChange}
							error={Boolean(errors.email)}
							disabled={status === 'loading'}
							startAdornment={
								<InputAdornment position='start'>
									<EmailIcon sx={{fontSize: '1rem', color: '#1A1A1A'}} />
								</InputAdornment>
							}
						/>
					)}
				/>

				{errors.email ? (
					<FormHelperText sx={{color: 'error.main'}}>
						{errors.email.message}
					</FormHelperText>
				) : null}
			</FormControl>

			<GuestLayoutPrimaryButton
				fullWidth
				type='submit'
				variant='contained'
				disabled={status === 'loading'}
			>
				{status === 'loading' && <CircularProgress size={16} sx={{mr: 3}} />}
				{status === 'loading' ? 'Processing...' : 'Reset password'}
			</GuestLayoutPrimaryButton>
		</form>
	)
}
