export interface IButtonLinkProps {
	label: string
	className?: string
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	disabled?: boolean
}
