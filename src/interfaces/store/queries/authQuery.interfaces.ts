export interface ILoginParams {
	email: string
	password: string
}

export interface IRegisterParams {
	email: string
	password: string
	accept_terms_and_conditions: boolean
}

export interface IForgotPasswordParams {
	email: string
}

export interface IVerifyParams {
	email: string
	token: string
}

export interface IRefreshParams {
	refresh: string
}
