import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IUser } from '../../interfaces'

const INITIAL_STATE: IUser = {
	id: 48,
	email: 'david@themadfox.com',
	username: 'DavichoDev',
	first_name: 'David',
	last_name: 'Gavilanez',
	phone_number: '+111111111111',
	public: false,
	picture:
		'https://rayna-app-development-public-media.s3.amazonaws.com/media/Sin_t%C3%ADtulo_6GzpSiY.png',
	about:
		"I'm a software developer Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic repudiandae ab labore in neque similique molestias? Modi, voluptate hic optio exercitationem nobis doloremque. Impedit quibusdam in nesciunt, eius dicta ratione. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic repudiandae ab labore in neque similique molestias? Modi, voluptate hic optio exercitationem nobis doloremque. Impedit quibusdam in nesciunt, eius dicta ratione. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic repudiandae ab labore in neque similique molestias?",
	city: 'Guayaquil',
	dob: new Date(),
	location: 'Ecuador',
	sex: 'Male',
	has_private_likes: true,
}

export const userSlice = createSlice({
	name: 'user',
	initialState: INITIAL_STATE,
	reducers: {
		setUser: (state, action: PayloadAction<IUser>) => {
			state = action.payload
		},
	},
})

export const { setUser } = userSlice.actions
