import { v4 } from 'uuid'

import { TabItem } from '../../atoms'

interface ITabsProps {
	tabList: ITabItemProps[]
	currentTab: number
	setCurrentTab: (tab: number) => void
	className?: string
}

interface ITabItemProps {
	icon?: React.ReactNode
	label: string
}

export const Tabs = ({
	currentTab,
	setCurrentTab,
	tabList,
	className,
}: ITabsProps): JSX.Element => {
	return (
		<nav
			className={`w-full grid grid-flow-col justify-center border-b border-b-neutral-300 ${className}`}
		>
			{tabList &&
				tabList.map(({ icon, label }, idx) => (
					<TabItem
						isActive={currentTab === idx}
						key={v4()}
						label={label}
						children={icon}
						onClick={() => setCurrentTab(idx)}
					/>
				))}
		</nav>
	)
}
