import {InvalidComponent} from "../../Errors";

export class Component {
	constructor(options) {

		this.type = options.type

		//for type 'code'
		this.finder = options.finder
		this.propertyPath = options.propertyPath

		//for type 'schema'
		this.location = options.location
		this.schema = options.schema
		this.mapUnique = options.unique

	}

	errors() {
		const errors = []
		if (this.type === 'code' && (!this.finder || !this.propertyPath || this.location || this.schema || this.mapUnique)) {
			errors.push(InvalidComponent('Invalid Code Component definition '+ this))
		} else if (this.type === 'schema' && (this.finder || !this.propertyPath || !this.location || !this.schema || !this.mapUnique)) {
			errors.push(InvalidComponent('Invalid Schema Component definition '+ this))
		}
	}

	isValid() {
		return !this.errors().length
	}

}