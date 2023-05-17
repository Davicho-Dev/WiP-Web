import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
	return (
		<section className='w-screen h-screen flex justify-center lg:!justify-end items-center relative bg-mobile bg-cover lg:!bg-web lg:!bg-contain'>
			<h1 className='w-40 top-14 left-24 font-black text-3xl text-secondary absolute hidden lg:!inline sepia mix-blend-difference'>
				ALL ART IS A WORK IN PROGRESS_
			</h1>
			<Outlet />
		</section>
	)
}

export default PublicLayout
