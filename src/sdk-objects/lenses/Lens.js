import {validateLens} from "../../validation/ValidateLens";
import {RequiredFieldNotSetInLens} from "../../Errors";
import {DefaultContext} from "../../parser/stages/ProcessStage";

export class Lens {

	constructor(name, schema, snippet, scope, components, rules, variables) {

		this.name = name
		this.schema = schema
		this.snippet = snippet
		this.scope = scope
		this.components = components
		this.rules = rules
		this.variables = variables
	}

	errors(context) {

		const errors = []

		if (context) {
			const validation = validateLens(this, context.schemas)
			if (!validation.result) {

				if (validation.difference) {
					validation.difference.forEach(i => errors.push(RequiredFieldNotSetInLens(i)))
				} else {
					errors.push(validation.error)
				}
			}
		}

		return errors
	}

	isValid(context) {
		return !this.errors(context).length
	}

}