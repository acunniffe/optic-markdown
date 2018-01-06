import {InvalidFinder} from "../../Errors";

export class Finder {
	constructor(options) {

		this.finderType = options.finderType

		//string finder props
		this.string = options.string
		this.rule = options.rule
		this.occurrence = options.occurrence

		//range finder props
		this.start = options.start
		this.end = options.end

	}

	errors() {
		const errors = []
		if (!['stringFinder', 'rangeFinder'].includes(this.finderType)) {
			errors.push(InvalidFinder("Finders must be of type 'stringFinder' or 'rangeFinder'"))
		}

		if (this.finderType === 'stringFinder' && (
				typeof this.occurrence !== 'number' ||
				typeof this.string !== 'string' ||
				!['entire', 'starting', 'contains'].includes(this.rule)
			)) {
			errors.push(InvalidFinder("String Finder is invalid as specified" + JSON.stringify(this)))
		}

		if (this.finderType === 'rangeFinder' && (
				typeof this.start !== 'number' ||
				typeof this.end !== 'number'
			)) {
			errors.push(InvalidFinder("Ranger Finder is invalid as specified" + JSON.stringify(this)))
		}

		return errors

	}

	isValid() {
		return !this.errors().length
	}

}