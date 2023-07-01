export interface ISearchFollowsResp {
	count?: number
	next: null | string
	previous?: null | string
	results: ISearchFollowsResultItem[] | []
}

export interface ISearchFollowsResultItem {
	id: number
	public_name: string
	username: string
	followed: boolean
	follower: boolean
	picture: string | null
}
