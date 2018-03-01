export class Snippet {
	constructor(block, language) {
		this.language = language
		this.block = block
	}

	isValid() {
		return this.language && this.block
	}
}