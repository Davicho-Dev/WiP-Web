interface CMSActionsInterface {
	type: 'SET_DATA'
	payload: object
}

// If you need add new global attributes change type to interface
type CMSInterface = CMSStateInterface

interface CMSProviderInterface {
	children: JSX.Element | JSX.Element[]
}

interface CMSStateInterface {
	isLoading: boolean
	data: object
}

export {
	CMSActionsInterface,
	CMSInterface,
	CMSProviderInterface,
	CMSStateInterface,
}
