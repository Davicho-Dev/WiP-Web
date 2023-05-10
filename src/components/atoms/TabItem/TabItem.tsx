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
			className={`w-full md:!w-60 h-10 inline-flex text-center leading-none cursor-pointer text-neutral-400 border-b-2 justify-center items-center gap-x-2 capitalize ${
				isActive ? '!text-primary border-b-primary' : 'border-b-transparent'
			}`}
			onClick={onClick}
		>
			{children}
			<span className='hidden md:!block text-inherit'>{label}_</span>
		</span>
	)
}
