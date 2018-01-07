export function ParseError(error = '', level = 'warn') {
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

export function NoValidDefinitionType(annotation, level = 'error') {
	return {
		level,
		type: 'NoValidDefinitionType',
		message: `No valid definition type found in annotation. Must include 'schema-def', 'lens-def' or... `,
		isError: true
	}
}

export function MissingCodeBlock(expectedType, level = 'error') {
	return {
		level,
		type: 'MissingCodeBlock',
		message: `${expectedType} requires a code block beneath its annotation`,
		isError: true
	}
}

export function MissingProperty(msg, level = 'error') {
	return {
		level,
		type: 'MissingProperty',
		message: msg,
		isError: true
	}
}

export function InvalidSchemaDefinition(msg, level = 'error') {
	return {
		level,
		type: 'InvalidSchemaDefinition',
		message: msg,
		isError: true
	}
}

export function InvalidFinder(msg, level = 'error') {
	return {
		level,
		type: 'InvalidFinder',
		message: msg,
		isError: true
	}
}

export function RequiredFieldNotSetInLens(field, level = 'error') {
	return {
		level,
		type: 'RequiredFieldNotSetInLens',
		message: `Required field ${field.join('.')} not specified in lens`,
		isError: true
	}
}