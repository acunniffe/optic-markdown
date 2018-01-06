export class Lens {

	constructor(name, schema, block, scope, components, rules) {
		this.name = name
		this.schema = schema
		this.block = block
		this.scope = scope
		this.components = components
		this.rules = rules
	}

	errors() {
		return []
	}

	isValid() {
		return !this.errors().length
	}

}