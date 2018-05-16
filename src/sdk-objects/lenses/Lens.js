import {InvalidId, InvalidLensDefinition, InvalidSchemaDefinition, MissingProperty} from "../../Errors";
import {validatePackageExportName} from "../../parser/grammar/Regexes";

export class Lens {

	constructor(name, id, schema, snippet, scope, components, rules, variables, subcontainers, initialValue = {}, range) {

		this.name = name
		this.id = id
		this.schema = schema
		this.snippet = snippet
		this.scope = scope
		this.components = components
		this.rules = rules
		this.variables = variables
		this.subcontainers = subcontainers
		this.initialValue = initialValue || {}
		this.range = range
	}

	errors() {

		const errors = []

		if (!this.id || typeof this.id !== 'string') {
			errors.push(MissingProperty("Missing Property 'id' in lens definition"))
		} else {
			if (!validatePackageExportName(this.id)) {
				return errors.push(new InvalidLensDefinition('Schema "id" is not valid'))
			}
		}

		if (!validatePackageExportName(this.id)) {
			errors.push(InvalidId(this.id))
		}

		if (typeof this.initialValue !== 'object') {
			errors.push(new InvalidLensDefinition(`Initial Value is not valid ${this.initialValue}`))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}