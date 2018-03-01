export class Dependencies {
	constructor(array = []) {
		this.dependencySet = new Set(array)
	}

	asArray() {
		return Array.from(this.dependencySet)
	}
}