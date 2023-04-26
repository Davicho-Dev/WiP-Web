import { render } from '@testing-library/react'

import { ButtonLink } from '../ButtonLink'

describe('ButtonLink test suite', () => {
	it('Should render correctly', () => {
		const label = 'Button Link'

		const { getByText } = render(<ButtonLink {...{ label }} />)

		expect(getByText(label)).toMatchSnapshot()
	})
})
