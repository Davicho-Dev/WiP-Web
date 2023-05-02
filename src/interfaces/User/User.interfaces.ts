export interface IUser {
	id?: number
	email?: string
	username?: string
	first_name?: string
	last_name?: string
	dob?: string
	phone_number?: string
	public?: boolean
	picture?: string
	about?: string
	location?: string
	city?: string
	sex?: string
	has_private_likes?: boolean
	social?: string[]
}
