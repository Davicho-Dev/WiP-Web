export interface ISearchResp {
	count?: number
	next?: null
	previous?: null
	results: SearchUserResults[] | []
}

export interface SearchUserResults {
	id: number
	public_name: string
	username: string
	picture: null | string
	followed: boolean
}
