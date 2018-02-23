import {Metadata} from "./Metadata";

export class Description {

	constructor(metadata = Metadata.empty, dependencies, schemas, lenses, containers, transformations) {
		this.metadata = metadata
		this.dependencies = dependencies
		this.schemas = schemas
		this.lenses = lenses
		this.containers = containers
		this.transformations = transformations
	}

	isValid() {
		//tbi
		return true
	}

	canPublish() {
		return this.metadata && this.isValid()
	}

}