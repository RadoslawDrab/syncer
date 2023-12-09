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
