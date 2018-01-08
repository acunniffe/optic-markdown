export class Component {
	constructor(type, finder, propertyPath, location, schema) {

		this.type = type

		//for type 'code'
		this.finder = finder
		this.propertyPath = propertyPath

		//for type 'schema'
		this.location = location
		this.schema = schema
	}
}