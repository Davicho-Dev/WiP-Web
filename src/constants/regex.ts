const RE_DIGIT = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/gm
)
const RE_EMAIL = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/gm)
const RE_PASSWORD = new RegExp(
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-])/gm
)
const RE_OTP = new RegExp(/^[0-9]$/gm)
const RE_PHONE = new RegExp(/^\+[1-9]{1}[0-9]{3,14}$/)

export { RE_DIGIT, RE_EMAIL, RE_PASSWORD, RE_OTP, RE_PHONE }
