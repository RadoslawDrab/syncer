export function filterObject<Value extends any>(
	obj: { [key: string]: Value },
	filterCallback: (value: Value) => boolean
): { [key: string]: Value } {
	return Object.keys(obj).reduce((prev, key) => {
		return filterCallback(obj[key] as Value) ? { ...prev, [key]: obj[key] } : prev
	}, {})
}
