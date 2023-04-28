export interface IButtonSolidProps {
	label: string
	className?: string
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset'
	onLoading?: boolean
	onClick?: () => void
	icon?: React.ReactNode
}
