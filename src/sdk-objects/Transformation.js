
import {InvalidTransformationDefinition} from "../Errors";
import {extractFunction} from "../utils/TransformationCode";

export class Transformation {

	constructor(inputSchema, outputSchema, script) {
		this.inputSchema = inputSchema;
		this.outputSchema = outputSchema;
		this.script = extractFunction(script, 'transform');

	}


	errors() {
		const errors = []
		if (!this.inputSchema) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "inputSchema"'))
		}

		if (!this.outputSchema) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "outputSchema"'))
		}


		if (this.script === null) {
			return errors.push(new InvalidTransformationDefinition(`Transformation code is not contain a valid Javascript Function named "transform"`))
		}

		if (!this.script && this.script !== null) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define a script'))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}
}