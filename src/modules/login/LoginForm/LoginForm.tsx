// ** React Imports
import {useState} from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import OutlinedInput, {OutlinedInputProps} from '@mui/material/OutlinedInput'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import {styled} from '@mui/material/styles'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'

// ** Third Party Imports
import * as yup from 'yup'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import toast from 'react-hot-toast'

// ** Hooks
import {useAuth} from 'src/hooks/useAuth'

// ** Component imports
import {
	GuestLayoutPrimaryButton
} from '@/common/modules/guest-layout'

// ** Types imports
import type {AxiosError} from 'axios'
import type {
	LoginFormData as FormData
} from './types'

// ** Other imports
import {
	emailSchema,
	passwordSchema
} from '@/common/yup-schemas'


const StyledOutlinedInput = styled(OutlinedInput)<OutlinedInputProps>({
	'& .MuiOutlinedInput-notchedOutline': {
		borderRadius: 0
	}
})

const schema = yup.object().shape({
	email: emailSchema,
	password: passwordSchema
})

const defaultValues: FormData = {
	email: '',
	password: ''
}

export function LoginForm() {
	// ** States
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [loading, setLoading] = useState<boolean>(false)

	// ** Hooks
	const auth = useAuth()

	const {
		control,
		setError,
		reset,
		handleSubmit,
		formState: {errors}
	} = useForm({
		defaultValues,
		mode: 'onBlur',
		resolver: yupResolver(schema)
	})

	type ResponseDataType = {
		key?: string
		message?: string
	}

	const onSubmit = (data: FormData) => {
		setLoading(true)
		const {email, password} = data

		auth.login({email, password}, (err: any) => {
			setLoading(false)

			const error = err as AxiosError
			const data = error.response?.data as ResponseDataType

			if (data?.key && data?.message) {
				if (data.key === 'email') {
					setError('email', {
						type: 'manual',
						message: 'Invalid email',
						shouldFocus: true
					})
				}
				else if(data.key === 'password') {
					reset()
					toast.error(data.message)
				}
			} else {
				toast.error(err.message)
			}
		})
	}

	return (
		<form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
			<FormControl fullWidth sx={{height: 70}}>
				<Controller
					name='email'
					control={control}
					rules={{required: true}}
					render={({field: {value, onChange, onBlur}}) => (
						<StyledOutlinedInput
							id='auth-login-email'
							placeholder='email'
							autoFocus
							value={value}
							onBlur={onBlur}
							onChange={onChange}
							error={Boolean(errors.email)}
							disabled={loading}
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

			<FormControl fullWidth sx={{mt: 4, height: 70}}>
				<Controller
					name='password'
					control={control}
					rules={{required: true}}
					render={({field: {value, onChange, onBlur}}) => (
						<StyledOutlinedInput
							id='auth-login-password'
							placeholder='password'
							value={value}
							onBlur={onBlur}
							onChange={onChange}
							error={Boolean(errors.password)}
							type={showPassword ? 'text' : 'password'}
							disabled={loading}
							startAdornment={
								<InputAdornment position='start'>
									<LockIcon sx={{fontSize: '1rem', color: '#1A1A1A'}} />
								</InputAdornment>
							}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										edge='end'
										onMouseDown={e => e.preventDefault()}
										onClick={() => setShowPassword(!showPassword)}
										disabled={loading}
									>
										{showPassword ? <EyeOutline /> : <EyeOffOutline />}
									</IconButton>
								</InputAdornment>
							}
						/>
					)}
				/>

				{(errors.password) ? (
					<FormHelperText sx={{color: 'error.main'}}>
						{errors.password.message}
					</FormHelperText>
				) : null}
			</FormControl>

			<Box
				sx={{
					my: 4,
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'flex-end'
				}}
			>
				<Link passHref href='/forgot-password'>
					<Typography component={MuiLink} variant='body2' sx={{color: 'secondary.main'}}>
						Forgot Password?
					</Typography>
				</Link>
			</Box>

			<GuestLayoutPrimaryButton
				fullWidth
				type='submit'
				variant='contained'
				disabled={loading}
			>
				{loading && <CircularProgress size={16} sx={{mr: 3}} />}
				{loading ? 'Processing...' : 'Login'}
			</GuestLayoutPrimaryButton>
		</form>
	)
}
