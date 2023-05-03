interface ITabItemProps {
	isActive?: boolean
	label: string
	onClick?: () => void
	children?: React.ReactNode
}

export const TabItem = ({
	children,
	label,
	onClick,
	isActive,
}: ITabItemProps): JSX.Element => {
	return (
		<span
			className={`w-60 h-10 inline-flex text-center leading-none cursor-pointer text-neutral-500 border-b-2 justify-center items-center gap-x-2 capitalize ${
				isActive ? 'text-primary border-b-primary' : 'border-b-transparent'
			}`}
			onClick={onClick}
		>
			{children}
			{label}_
		</span>
	)
}
