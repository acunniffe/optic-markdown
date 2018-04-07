import {InvalidId, MissingProperty} from "../../Errors";
import {validatePackageExportName} from "../../parser/grammar/Regexes";

export class Lens {

	constructor(name, id, schema, snippet, scope, components, rules, variables, subcontainers, range) {

		this.name = name
		this.id = id
		this.schema = schema
		this.snippet = snippet
		this.scope = scope
		this.components = components
		this.rules = rules
		this.variables = variables
		this.subcontainers = subcontainers
		this.range = range
	}

	errors() {

		const errors = []

		if (!this.id || typeof this.id !== 'string') {
			errors.push(MissingProperty("Missing Property 'id' in lens definition"))
		}

		if (!validatePackageExportName(this.id)) {
			errors.push(InvalidId(this.id))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}