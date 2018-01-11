export class Snippet {
	constructor(block, language, version) {
		this.language = language
		this.block = block
		this.version = version
	}

	isValid() {
		return this.language && this.block
	}
}