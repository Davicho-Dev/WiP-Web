import { ChangeEventHandler } from 'react'

import { IFormItem } from '../../../../interfaces'

type TFormInputCounterType =
	| 'text'
	| 'password'
	| 'email'
	| 'number'
	| 'url'
	| 'tel'
	| 'search'

type TInputAutoCapitalize = 'none' | 'sentences' | 'words' | 'characters'

export interface IFormInput extends IFormItem {
	autoComplete?: string
	autoCorrect?: 'on' | 'off'
	parentClassName?: string
	childClassName?: string
	autoCapitalize?: TInputAutoCapitalize
	max?: string | number | Date
	maxLength?: number
	min?: string | number | Date
	minLength?: number
	onChange?: ChangeEventHandler<HTMLInputElement>
	readOnly?: boolean
	step?: string
	type?: TFormInputCounterType
}
