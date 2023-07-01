export interface IFormProps {
	email: string
	password: string
	password_confirmation: string
	accept_terms_and_conditions: boolean
}

export interface IRegisterResp {
	ACCESS: string
	REFRESH: string
}
