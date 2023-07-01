import { v4 } from 'uuid'

import { TabItem } from '../../atoms'
import {
	faHeart,
	faTableCells,
	faUnlockKeyhole,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ITabsProps {
	isPrivate?: boolean
	isAnonymous?: boolean
	currentTab: number
	setCurrentTab: (tab: number) => void
	className?: string
}

export const Tabs = ({
	currentTab,
	setCurrentTab,
	className,
	isAnonymous,
	isPrivate = true,
}: ITabsProps): JSX.Element => {
	return (
		<nav
			className={`w-full flex justify-center border-b border-b-neutral-300 ${className}`}
		>
			<TabItem
				isActive={currentTab === 0}
				children={<FontAwesomeIcon icon={faTableCells} />}
				onClick={() => setCurrentTab(0)}
				label='Post'
			/>
			{isAnonymous ? null : (
				<TabItem
					isActive={currentTab === 1}
					children={<FontAwesomeIcon icon={faUnlockKeyhole} />}
					onClick={() => setCurrentTab(1)}
					label='Anonymous posts'
				/>
			)}
			{isPrivate ? null : (
				<TabItem
					isActive={currentTab === 2}
					children={<FontAwesomeIcon icon={faHeart} />}
					onClick={() => setCurrentTab(2)}
					label='Post you like'
				/>
			)}
		</nav>
	)
}
