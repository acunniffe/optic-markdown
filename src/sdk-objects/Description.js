import {Metadata} from "./Metadata";

export class Description {

	constructor(metadata = Metadata.empty, dependencies, schemas, lenses) {
		this.metadata = metadata
		this.dependencies = dependencies
		this.schemas = schemas
		this.lenses = lenses
	}

	isValid() {
		//tbi
		return true
	}

	canPublish() {
		return this.metadata && this.isValid()
	}

}