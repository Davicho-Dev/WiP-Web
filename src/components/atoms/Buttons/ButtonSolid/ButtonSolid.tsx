import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'

import { IButtonSolidProps } from './ButtonSolid.interfaces'

import styles from './ButtonSolid.module.sass'

export const ButtonSolid = ({
	className,
	label,
	type,
	disabled,
	onClick,
	icon,
	onLoading,
	onSuccess,
}: IButtonSolidProps): JSX.Element => {
	return (
		<button
			className={`${styles.button} ${className ?? ''} ${
				onSuccess ? styles['button--success'] : ''
			} ${onLoading ? styles['button--loading'] : ''}  `}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{!onLoading && icon}
			{onLoading ? (
				<FontAwesomeIcon
					icon={faSpinner}
					className='!text-primary animate-spin'
				/>
			) : onSuccess ? (
				<FontAwesomeIcon icon={faCheck} className='text-white' />
			) : (
				label
			)}
		</button>
	)
}
