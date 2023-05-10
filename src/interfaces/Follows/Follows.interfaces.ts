export interface IFollowersResp {
	count?: number
	next?: null
	previous?: null
	results: IFollowersResultItem[] | []
}

export interface IFollowersResultItem {
	from_user: IFollowResultItemUser
	to_user: number
	active: boolean
	created: string
	modified: string
}

export interface IFollowedResp {
	count?: number
	next?: null
	previous?: null
	results: IFollowedResultItem[] | []
}

export interface IFollowedResultItem {
	from_user: number
	active: boolean
	created: string
	modified: string
	to_user: IFollowResultItemUser
}

export interface IFollowResultItemUser {
	id: number
	username: string
	first_name: string
	middle_name: string
	last_name: string
	picture: string
	about: string
	social: ISocial[]
	follower_count: number
	following_count: number
}
export interface ISocial {
	id?: number
	network?: string
	url?: string
}
