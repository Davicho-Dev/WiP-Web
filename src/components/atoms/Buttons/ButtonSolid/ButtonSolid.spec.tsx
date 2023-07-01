import { render } from '@testing-library/react'

import { ButtonSolid } from './ButtonSolid'

describe('ButtonSolid test suite', () => {
	it('Should render correctly', () => {
		const label = 'Button Solid'

		const { getByText } = render(<ButtonSolid {...{ label }} />)

		expect(getByText(label)).toMatchSnapshot()
	})
})
