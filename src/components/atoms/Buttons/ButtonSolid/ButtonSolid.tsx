import { IButtonSolidProps } from './ButtonSolid.interfaces'

import styles from './ButtonSolid.module.sass'

export const ButtonSolid = ({
	className,
	label,
	type,
	disabled,
	onClick,
}: IButtonSolidProps): JSX.Element => {
	return (
		<button
			className={`${styles.button} ${className ?? ''}`}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
