export interface IFollowsResp {
	count?: number
	next?: null
	previous?: null
	results: IFollowersResultItem[] | IFollowedResultItem[] | []
}

export interface IFollowersResultItem {
	from_user: IFollowResultItemUser
	to_user: number
	active: boolean
	created: string
	modified: string
}

export interface IFollowedResultItem {
	from_user: number
	to_user: IFollowResultItemUser
	active: boolean
	created: string
	modified: string
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
