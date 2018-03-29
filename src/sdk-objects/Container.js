
export class Container {

	constructor(name, subcontainer, snippet, pulls, childrenRule, schemaComponents, range) {
		this.name = name
		this.snippet = snippet
		this.subcontainer = subcontainer
		this.pulls = pulls
		this.childrenRule = childrenRule
		this.schemaComponents = schemaComponents
		this.range = range
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