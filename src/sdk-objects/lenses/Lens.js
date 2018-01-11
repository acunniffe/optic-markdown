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

	errors() {

		const errors = []

		//@todo impl

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}