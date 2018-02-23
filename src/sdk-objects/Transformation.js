
import {InvalidTransformationDefinition} from "../Errors";

export class Transformation {

	constructor(inputSchema, outputSchema, script) {
		this.inputSchema = inputSchema;
		this.outputSchema = outputSchema;
		this.script = script;
	}


	errors() {
		const errors = []
		if (!this.inputSchema) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "inputSchema"'))
		}

		if (!this.outputSchema) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "outputSchema"'))
		}

		if (!this.script) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define a script'))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}
}