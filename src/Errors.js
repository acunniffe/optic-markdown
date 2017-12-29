export function ParseError(error, level = 'warn') {
	return {
		error,
		level,
		type: 'ParseError',
		message: 'Error parsing Annotation. The definition will be ignored unless errors resolved.' + error,
		isError: true
	}
}

export function NoAnnotationsFound(file, level = 'warn') {
	return {
		level,
		type: 'NoAnnotationsFound',
		message: `No annotations found in ${file}. Ignore this warning if that was intended.`,
		isError: true
	}
}