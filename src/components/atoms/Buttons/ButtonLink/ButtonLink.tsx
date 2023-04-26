import { IButtonLinkProps } from './ButtonLink.interfaces'

import styles from './ButtonLink.module.sass'

export const ButtonLink = ({
	className,
	label,
	type,
	onClick,
}: IButtonLinkProps): JSX.Element => {
	return (
		<button
			className={`${styles.button} ${className ?? ''}`}
			onClick={onClick}
			type={type}
		>
			{label}
		</button>
	)
}
