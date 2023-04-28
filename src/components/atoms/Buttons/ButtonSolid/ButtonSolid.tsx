import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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
}: IButtonSolidProps): JSX.Element => {
	return (
		<button
			className={`${styles.button} ${className ?? ''}`}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{!onLoading && icon}
			{onLoading ? (
				<FontAwesomeIcon
					icon={faSpinner}
					className='text-primary animate-spin'
				/>
			) : (
				label
			)}
		</button>
	)
}
