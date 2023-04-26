import React from 'react'

import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import TFormInputPassword from './FormInputPassword.interface'

import styles from './FormInputPassword.module.sass'

export const FormInputPassword = ({
	icon,
	onError,
	errorDescription,
	disabled,
	parentClassName,
	childClassName,
	register,
	autoComplete,
	autoCorrect,
	autoFocus,
	className,
	iconPosition,
	id,
	maxLength,
	minLength,
	name,
	onChange,
	onLoading,
	placeholder,
	readOnly,
	required,
	spellCheck,
	style,
	title,
}: TFormInputPassword): JSX.Element => {
	const [showPassword, setShowPassword] = React.useState<boolean>(false)

	return (
		<fieldset
			{...{ disabled }}
			data-error-message={errorDescription}
			className={`${parentClassName ?? ''} ${styles.wrapper} ${
				onError ? styles['wrapper--error'] : ''
			}`}
		>
			{icon}
			<input
				title={title}
				autoComplete={autoComplete}
				autoCorrect={autoCorrect}
				autoFocus={autoFocus}
				id={id}
				maxLength={maxLength}
				minLength={minLength}
				name={name}
				onChange={onChange}
				placeholder={placeholder}
				readOnly={readOnly}
				required={required}
				spellCheck={spellCheck}
				style={style}
				type={showPassword ? 'text' : 'password'}
				disabled={disabled}
				className={`${childClassName ?? ''} ${styles.wrapper__input} ${
					onError ? styles['wrapper__input--error'] : ''
				}`}
				{...register}
			/>
			<FontAwesomeIcon
				className={`${styles.wrapper__icon} ${
					onError ? styles['wrapper__icon--error'] : ''
				}`}
				onClick={() => setShowPassword(!showPassword)}
				icon={showPassword ? faEyeSlash : faEye}
			/>
		</fieldset>
	)
}
