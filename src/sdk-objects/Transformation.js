
import {InvalidTransformationDefinition} from "../Errors";
import {extractAskCalls, extractFunction} from "../helpers/TransformationCode";

export class Transformation {

	constructor(name, input, output, script) {
		this.name = name;
		this.input = input;
		this.output = output;
		this.ask = extractAskCalls(script).toJsonSchema();
		this.script = extractFunction(script, 'transform');
	}


	errors() {
		const errors = []

		if (!this.name) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define a "name"'))
		}

		if (!this.input) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "input"'))
		}

		if (!this.output) {
			return errors.push(new InvalidTransformationDefinition('Transformations need to a define an "outputSchema"'))
		}


		if (this.script === null) {
			return errors.push(new InvalidTransformationDefinition(`Transformation code does not contain a valid Javascript Function named "transform"`))
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