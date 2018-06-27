export class Description {

	constructor(info, schemas, lenses, transformations) {
		this.info = info
		this.schemas = schemas
		this.lenses = lenses
		this.transformations = transformations
	}

	isValid() {
		//tbi
		return true
	}

	canPublish() {
		return this.info && this.isValid()
	}

}
