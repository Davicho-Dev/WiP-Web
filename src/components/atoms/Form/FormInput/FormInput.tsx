import { FC } from 'react'

import { IFormInput } from './FormInput.interface'

import styles from './FormInput.module.sass'

const FormInput = ({
	childClassName,
	disabled = false,
	icon,
	errorDescription,
	type = 'text',
	onError = false,
	parentClassName,
	register,
	autoCapitalize,
	autoComplete,
	autoCorrect,
	autoFocus,
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
	step,
	value,
}: IFormInput): JSX.Element => {
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
				autoCapitalize={autoCapitalize}
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
				title={title}
				step={step}
				value={value}
				type={type}
				disabled={disabled}
				className={`${childClassName ?? ''} ${styles.wrapper__input} ${
					onError ? styles['wrapper__input--error'] : ''
				}`}
				{...register}
			/>
		</fieldset>
	)
}

export default FormInput
