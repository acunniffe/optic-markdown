export class Description {

	constructor(metaInformation, dependencies, schemas, lenses) {
		this.metaInformation = metaInformation
		this.dependencies = dependencies
		this.schemas = schemas
		this.lenses = lenses
	}

	isValid() {
		//tbd
	}

	canPublish() {
		return this.metaInformation && this.isValid()
	}

}