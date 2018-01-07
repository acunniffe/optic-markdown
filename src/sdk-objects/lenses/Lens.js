import {validateLens} from "../../validation/ValidateLens";
import {RequiredFieldNotSetInLens} from "../../Errors";
import {DefaultContext} from "../../parser/stages/ProcessStage";

export class Lens {

	constructor(name, schema, block, scope, components, rules) {

		this.name = name
		this.schema = schema
		this.block = block
		this.scope = scope
		this.components = components
		this.rules = rules
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