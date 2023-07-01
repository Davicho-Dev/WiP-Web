export interface ISearchResp {
	count?: number
	next: null | string
	previous?: null | string
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
