import { ChangeEventHandler } from 'react'

import { IFormItem } from '../../../../interfaces'

interface TFormInputPassword extends IFormItem {
	autoComplete?: string
	autoCorrect?: 'on' | 'off'
	maxLength?: number
	minLength?: number
	onChange?: ChangeEventHandler<HTMLInputElement>
	parentClassName?: string
	childClassName?: string
	readOnly?: boolean
}

export default TFormInputPassword
