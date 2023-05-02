const PATTERN_EMAIL = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm
const PATTERN_PASSWORD =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/gm
const PATTERN_PHONE = /^\+[1-9]{1}[0-9]{3,14}$/

const REGEX_EMAIL = new RegExp(PATTERN_EMAIL)
const REGEX_PASSWORD = new RegExp(PATTERN_PASSWORD)
const REGEX_PHONE = new RegExp(PATTERN_PHONE)

export {
	PATTERN_EMAIL,
	PATTERN_PASSWORD,
	PATTERN_PHONE,
	REGEX_EMAIL,
	REGEX_PASSWORD,
	REGEX_PHONE,
}
