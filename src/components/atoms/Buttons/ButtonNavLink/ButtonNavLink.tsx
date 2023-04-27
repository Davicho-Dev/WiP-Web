import { NavLink } from 'react-router-dom'

interface IButtonNavLinkProps {
	to: string
	icon?: React.ReactNode
	label: string
	className?: string
}

export const ButtonNavLink = ({
	icon,
	to,
	label,
	className,
}: IButtonNavLinkProps): JSX.Element => {
	return (
		<NavLink
			className={({ isActive }) =>
				`w-full h-10 grid items-center pl-4 border-2 border-neutral-800 rounded-3xl ${
					isActive ? 'bg-neutral-800 text-secondary' : 'text-neutral-800'
				}  ${className}`
			}
			to={to}
		>
			{icon}
			{label}
		</NavLink>
	)
}
