import styled from 'styled-components'

export const FormInputStyled = styled.input<{ pseudoHolder: string }>`
	&:invalid {
		&:before {
			content: '${props => props.pseudoHolder}';
		}
	}
`
