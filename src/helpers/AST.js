export function getAssignmentProperty(key, properties) {
	const obj = properties.find(i=> i.type === 'assignmentProperty' && i.key === key)
	if (obj) {
		return obj.value
	}
}