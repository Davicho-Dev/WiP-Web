import styles from './Avatar.module.sass'

import { IAvatarProps } from './Avatar.interfaces'

export const Avatar = ({
	className,
	onClick,
	src,
	title,
}: IAvatarProps): JSX.Element => (
	<figure className={`${styles.wrapper} ${className}`} onClick={onClick}>
		<img
			className={styles.wrapper__img}
			src={src}
			alt={title + ' Avatar'}
			title={title + ' Avatar'}
		/>
	</figure>
)
