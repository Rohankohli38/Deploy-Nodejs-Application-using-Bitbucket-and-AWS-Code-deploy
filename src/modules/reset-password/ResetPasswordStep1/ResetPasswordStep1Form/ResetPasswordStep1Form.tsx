// ** React Imports
import {useState} from 'react'

// ** MUI Components
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import {styled} from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'

// **Icons
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import LockIcon from '@mui/icons-material/Lock'

// ** Hooks
import {useRouter} from 'next/router'

// ** Third Party Imports
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, Controller} from 'react-hook-form'
import toast from 'react-hot-toast'

import axiosInstance from 'src/axios'
import {accountConfig} from 'src/configs/account'

// ** Component imports
import {PasswordInstruction} from './PasswordInstruction'
import {GuestLayoutPrimaryButton} from '@/common/modules/guest-layout'

// ** Types imports
import type {FourStateStatus} from '@/common/types/misc'
import type {
	ResetPasswordStep1FormData as FormData,
	ResetPasswordStep1FormProps as Props
} from './types'

// ** Other imports
import {
	passwordSchema
} from '@/common/yup-schemas'


const OutlinedInputStyled = styled(OutlinedInput)({
	'& .MuiOutlinedInput-notchedOutline': {
		borderRadius: 0
	}
})

const schema = yup.object().shape({
	password: passwordSchema,
	repeatedPassword: yup.string()
		.required('Required')
		.oneOf([yup.ref('password')], `Passwords don't match`)
})

const defaultValues: FormData = {
	password: '',
	repeatedPassword: ''
}

export function ResetPasswordStep1Form(props: Props) {
	// ** Props
	const {activateNextStep} = props

	// ** States
	const [showPassword1, setShowPassword1] = useState<boolean>(false)
	const [showPassword2, setShowPassword2] = useState<boolean>(false)
	const [status, setStatus] = useState<FourStateStatus>('idle')

	// ** Hooks
	const router = useRouter()
	const {token} = router.query

	const {
		reset,
		control,
		handleSubmit,
		watch,
		formState: {errors}
	} = useForm({
		defaultValues,
		mode: 'onBlur',
		resolver: yupResolver(schema)
	})

	const onSubmit = (data: FormData) => {
		setStatus('loading')

		axiosInstance
			.post(`${accountConfig.resetPassEndpoint}/${token}`, data)
			.then(() => {
				setStatus('succeeded')
				reset()
				activateNextStep()
			})
			.catch((e) => {
				setStatus('failed')
				const message = e.response?.data?.message ?? 'Something went wrong'
				toast.error(Array.isArray(message) ? message[0] : message)
			})
	}

	return (
		<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<InputLabel
				htmlFor='reset-password-new-password-input'
				error={Boolean(errors.password)}
				sx={{
					mb: 2,
					fontWeight: 500,
					color: '#1A1A1A'
				}}
			>
				New Password
			</InputLabel>

			<FormControl fullWidth sx={{height: 80}}>
				<Controller
					name='password'
					control={control}
					rules={{required: true}}
					render={({field: {value, onChange, onBlur}}) => (
						<OutlinedInputStyled
							id='reset-password-new-password-input'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							error={Boolean(errors.password)}
							type={showPassword1 ? 'text' : 'password'}
							disabled={status === 'loading'}
							startAdornment={
								<InputAdornment position='start'>
									<LockIcon color='secondary' sx={{fontSize: 'small'}} />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={() => setShowPassword1(pre => !pre)}>
										{showPassword1 ? <EyeOutline /> : <EyeOffOutline />}
									</IconButton>
								</InputAdornment>
							}
						/>
					)}
				/>

				{errors.password ? (
					<FormHelperText sx={{color: 'error.main'}}>
						{errors.password.message}
					</FormHelperText>
				) : null}
			</FormControl>

			<InputLabel
				htmlFor='reset-password-repeat-password-input'
				error={Boolean(errors.repeatedPassword)}
				sx={{
					my: 2,
					fontWeight: 500,
					color: '#1A1A1A'
				}}
			>
				Repeat Password
			</InputLabel>
			<FormControl fullWidth sx={{height: 80}}>
				<Controller
					name='repeatedPassword'
					control={control}
					rules={{required: true}}
					render={({field: {value, onChange, onBlur}}) => (
						<OutlinedInputStyled
							id='reset-password-repeat-password-input'
							value={value}
							onChange={onChange}
							onBlur={onBlur}
							error={Boolean(errors.repeatedPassword)}
							type={showPassword2 ? 'text' : 'password'}
							disabled={status === 'loading'}
							startAdornment={
								<InputAdornment position='start'>
									<LockIcon color='secondary' sx={{fontSize: 'small'}} />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton onClick={() => setShowPassword2(pre => !pre)}>
										{showPassword2 ? <EyeOutline /> : <EyeOffOutline />}
									</IconButton>
								</InputAdornment>
							}
						/>
					)}
				/>

				{errors.repeatedPassword ? (
					<FormHelperText sx={{color: 'error.main'}}>
						{errors.repeatedPassword.message}
					</FormHelperText>
				) : null}
			</FormControl>

			<FormHelperText sx={{mb: 6}}>
				<PasswordInstruction
					checked={/[A-Z]/g.test(watch('password'))}
					label='At least 1 uppercase letter'
				/>

				<PasswordInstruction
					checked={/[a-z]/g.test(watch('password'))}
					label='At least 1 lowercase letter'
				/>

				<PasswordInstruction
					checked={/\d/g.test(watch('password'))}
					label='At least 1 number'
				/>

				<PasswordInstruction
					checked={/[^a-zA-Z\d\s]/g.test(watch('password'))}
					label='At least 1 Special character'
				/>
			</FormHelperText>

			<GuestLayoutPrimaryButton
				fullWidth
				size='large'
				type='submit'
				variant='contained'
				disabled={status === 'loading'}
			>
				{(status === 'loading') && <CircularProgress size={16} sx={{mr: 3}} />}
				{(status === 'loading') ? 'Processing...' : 'Submit'}
			</GuestLayoutPrimaryButton>
		</form>
	)
}
