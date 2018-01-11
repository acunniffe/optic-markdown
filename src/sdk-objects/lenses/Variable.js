export class Variable {

	constructor(options) {
		this.in = options.in
		this.token = options.token
	}

	errors() {
		return []
	}

	isValid() {
		return !this.errors().length
	}

}