const { stdin: input } = require('process')

input.resume()

input.on('data', (data) => {
	const srtingData = data.toString('utf-8')
	const dataArray = srtingData.split(/\n/)

	if (dataArray[0] === 'ENCRYPT') {
		encrypt(dataArray[1])
	} else if (dataArray[0] === 'DECRYPT') {
		decrypt(dataArray[1])
	} else {
		console.log('Option error')
	}
})

const matrix = [
	['E', 'N', 'C', 'R', 'Y'],
	['P', 'T', 'A', 'B', 'D'],
	['F', 'G', 'H', 'I', 'K'],
	['L', 'M', 'O', 'Q', 'S'],
	['U', 'V', 'W', 'X', 'Z'],
]

const searchLetter = (letter) => {
	const arr = []

	matrix.every((row, x) => {
		const y = row.findIndex((letterT) => letterT === letter)

		if (y > -1) {
			arr.push(x)
			arr.push(y)
			return false
		}
		return true
	})

	return arr
}

const encrypt = (str) => {
	str = str.toUpperCase().replace(/ /g, '').split('')

	const arr1 = []
	const arr2 = []

	str.forEach((letterE) => {
		const arrLetter = searchLetter(letterE)
		arr1.push(arrLetter[0])
		arr2.push(arrLetter[1])
	})

	const arrAux = arr1.concat(arr2)

	const arr = []

	arrAux.forEach((item, index) => {
		if (index % 2 === 0) {
			arr.push(matrix[item][arrAux[index + 1]])
		}
	})

	console.log(arr.join(''))
}

const decrypt = (str) => {
	str = str.toUpperCase().replace(/ /g, '').split('')

	let arr1 = []
	let arr2 = []

	str.forEach((letterE, index) => {
		if (str.length % 2 === 0) {
			if (index + 1 <= str.length / 2) {
				arr1 = arr1.concat(searchLetter(letterE))
			} else if (index + 1 > str.length / 2) {
				arr2 = arr2.concat(searchLetter(letterE))
			}
		} else if (str.length % 2 === 1) {
			if (index + 1 === Math.round(str.length / 2)) {
				const arrAux = searchLetter(letterE)
				arr1.push(arrAux[0])
				arr2.push(arrAux[1])
			} else if (index + 1 < str.length / 2) {
				arr1 = arr1.concat(searchLetter(letterE))
			} else if (index + 1 > str.length / 2) {
				arr2 = arr2.concat(searchLetter(letterE))
			}
		}
	})

	const arr = []
	arr1.forEach((x, index) => {
		arr.push(matrix[x][arr2[index]])
	})

	console.log(arr.join(''))
}
