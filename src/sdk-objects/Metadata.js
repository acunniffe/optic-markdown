import {MissingMetadata} from "../Errors";

export class Metadata {
	constructor(author, name, version) {
		this.author = author
		this.name = name
		this.version = version
	}

	errors() {
		if (!this.author || !this.name || !this.version) {
			return [MissingMetadata()]
		} else return []
	}

	isValid() {
		return !this.errors().length
	}
}

Metadata.empty = {}