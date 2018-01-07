export function validateDescription(description, errors, callback) {

	const context = {schemas: description.schemas}

	const invalidLenses = []
	const validLenses = []
	description.lenses.forEach(l=> {
		const validationErrors = l.errors(context)
		if (validationErrors.length) {
			invalidLenses.push(l)
			errors = errors.concat(invalidLenses.difference || [invalidLenses.error])
		} else {
			validLenses.push(l)
		}
	})

	//only return valid lenses in the final description
	description.lenses = validLenses

	callback(description, errors)
}