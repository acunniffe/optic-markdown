export class Lens {

	constructor(name, schema, snippet, scope, components, rules, variables, subcontainers) {

		this.name = name
		this.schema = schema
		this.snippet = snippet
		this.scope = scope
		this.components = components
		this.rules = rules
		this.variables = variables
		this.subcontainers = subcontainers
	}

	errors() {

		const errors = []

		//@todo impl

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}