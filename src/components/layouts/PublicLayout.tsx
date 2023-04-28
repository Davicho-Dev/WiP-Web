import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
	return (
		<section className='w-screen h-screen flex justify-center lg:!justify-end items-center relative bg-mobile bg-cover lg:!bg-web lg:!bg-contain'>
			<h1 className='w-40 top-14 left-40 text-3xl absolute hidden lg:!inline'>
				LET’S PUSH THINGS FORWARD_
			</h1>
			<Outlet />
		</section>
	)
}

export default PublicLayout
