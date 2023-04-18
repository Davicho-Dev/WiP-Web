import { FC } from 'react'

import FormAuthInterface from './FormAuth.interface'

const FormAuth: FC<FormAuthInterface> = ({ children, handleSubmit, title }) => (
	<form
		onSubmit={handleSubmit}
		className='grid bg-neutral-100 dark:bg-neutral-800 shadow-2xl dark:shadow-neutral-900 rounded xs:w-20 sm:w-1/2 md:w-1/3 lg:w-2/5 mx-auto my-10 p-4 md:p-10 gap-y-4'
	>
		{title && <h1 className='text-center text-2xl font-bold'>{title}</h1>}
		{children}
	</form>
)

export default FormAuth
