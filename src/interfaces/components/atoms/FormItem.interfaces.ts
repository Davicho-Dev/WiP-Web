import { ReactNode } from 'react'

import { UseFormRegisterReturn } from 'react-hook-form'

import { TCommonProps } from '../../types'

export interface IFormItem extends TCommonProps {
	autoFocus?: boolean
	icon?: ReactNode
	iconPosition?: 'left' | 'right'
	disabled?: boolean
	required?: boolean
	name?: string
	onError?: boolean
	errorDescription?: string
	placeholder?: string
	value?: string
	register?: any
}
