export interface ISearchResp {
	count?: number
	next?: null
	previous?: null
	results: SearchResultUserItem[] | []
}

export interface SearchResultUserItem {
	id: number
	public_name: string
	username: string
	picture: null | string
	followed: boolean
}
