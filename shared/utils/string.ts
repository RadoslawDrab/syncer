/**
 * @param {string} str string to convert to camel case
 * @example test-test -> testTest
 */
export function camelCase(str: string): string {
	const separatedWords = str
		.match(/\w*/gu)
		?.filter((word) => !!word)
		// Filters out first word if it
		.filter((word, i) => {
			return !(i === 0 && word[0].match(/\d/gu))
		})

	if (separatedWords?.length === 1) {
		return separatedWords[0].toLowerCase()
	}
	const newStr = separatedWords?.reduce((acc, value, i) => {
		return i > 0 ? (acc += value[0].toUpperCase() + value.substring(1)) : (acc += value)
	}, '')

	return newStr ?? str
}

export function formatPhoneNumber(phoneNumber: string, type: 'dash' | 'space' | 'none' = 'none'): string {
	const number = phoneNumber.replace(/\D/g, '')
	const segments = number.match(/\d{3}/g)

	switch (type) {
		case 'dash': {
			return segments?.join('-') ?? number
		}
		case 'space': {
			return segments?.join(' ') ?? number
		}
		case 'none': {
			return number
		}
	}
}
export function invertFullname(fullname: string): string {
	return fullname.split(' ').reverse().join(' ')
}

export function capitalizeFirstLetter(text: string): string {
	return text
		.replace(/(?![\włśóęąćżźń^])./gu, ' ')
		.split(' ')
		.map((word, i) => {
			// Checks if word is first and doesn't contain `^` character. Returns word with capitalized first letter
			if (i === 0 && word[0] !== '^') return word[0].toUpperCase() + word.substring(1)
			// Checks if word contains `^` character. Returns word with capitalized first letter and removed `^` character
			else if (word[0] === '^') return word.substring(1)[0].toUpperCase() + word.substring(2)
			else return word.toLowerCase()
		})
		.join(' ')
}
export function capitalizeFirstLetters(text: string): string {
	return capitalizeFirstLetter(text)
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.substring(1))
		.join(' ')
}
