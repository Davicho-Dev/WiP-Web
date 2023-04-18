import { FormEventHandler } from 'react'

interface FormAuthInterface {
	children?: JSX.Element | JSX.Element[]
	title?: string
	handleSubmit: FormEventHandler<HTMLFormElement>
}

export default FormAuthInterface
