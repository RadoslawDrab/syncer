import { ObjectKeys } from 'shared/types/global'

export function filterObject<Value extends any>(
	obj: ObjectKeys<Value>,
	func: (value: Value, index: number) => boolean
): ObjectKeys<Value> {
	return Object.keys(obj).reduce((prev, key, i) => {
		return func(obj[key] as Value, i) ? { ...prev, [key]: obj[key] } : prev
	}, {})
}
export function findObject<Value extends any>(
	obj: ObjectKeys<Value>,
	func: (value: Value, index: number) => boolean
): Value | null {
	return obj[Object.keys(obj).find((key, i) => func(obj[key] as Value, i)) ?? -1] || null
}
export function getAllObjectKeys(obj: ObjectKeys<any>): string[] {
	return Object.keys(obj)
		.map((key) => {
			const value = obj[key]
			if (typeof value === 'object' && !Array.isArray(value)) {
				return getAllObjectKeys(value)
			}
			return key
		})
		.flat()
}
export function flattenObject(obj: ObjectKeys<any>): ObjectKeys<any> {
	return Object.keys(obj).reduce((acc, key) => {
		const value = obj[key]
		if (typeof value === 'object' && !Array.isArray(value)) {
			return { ...acc, ...flattenObject(value) }
		}
		return { ...acc, [key]: value }
	}, {})
}
export function objectToArray<T = any>(obj: ObjectKeys<T>): T[] {
	return Object.keys(obj)
		.map((key: keyof typeof obj) => obj[key])
		.filter((key) => !!key) as T[]
}
export function compareArrays<Type = any>(array1: Type[], array2: Type[], type: 'all' | 'any' = 'all'): boolean {
	switch (type) {
		case 'all': {
			return array1.map((val1) => !!array2.find((val2) => val1 === val2)).every((val) => val)
		}
		case 'any': {
			return array1.some((val1) => !!array2.find((val2) => val2 === val1))
		}
	}
}