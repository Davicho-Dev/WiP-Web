export interface ISearchResp {
	count?: number
	next?: null
	previous?: null
	results: SearchResultUserItem[] | []
}

export interface SearchResultUserItem {
	followed: boolean
	follower: boolean
	id: number
	picture: null | string
	public_email: string
	public_name: string
	username: string
}
