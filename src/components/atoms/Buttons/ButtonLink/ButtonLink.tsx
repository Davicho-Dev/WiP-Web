import { IButtonLinkProps } from './ButtonLink.interfaces'

import styles from './ButtonLink.module.sass'

export const ButtonLink = ({
	className,
	label,
	type,
	onClick,
	disabled,
}: IButtonLinkProps): JSX.Element => {
	return (
		<button
			className={`${styles.button} ${className ?? ''}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{label}
		</button>
	)
}
