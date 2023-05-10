import {
	faFacebook,
	faInstagram,
	faSoundcloud,
	faSpotify,
	faTiktok,
	faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'

export const SocialIcons = (icon: string) => {
	return {
		SP: faSpotify,
		SC: faSoundcloud,
		IN: faInstagram,
		FB: faFacebook,
		TW: faTwitter,
		TK: faTiktok,
		WB: faWindowMaximize,
		WB2: faWindowMaximize,
	}[icon]
}
