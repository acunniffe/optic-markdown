import Ajv from 'ajv'
import deref from 'json-schema-deref-sync'
import collection from 'lodash/collection'
import {InvalidSchemaDefinition, MissingProperty} from "../Errors";
var ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

export class Schema {

	constructor(id, json) {
		this.id = id;
		this.definition = json;
	}

	matches(data) {
		if (!this.isValid()) return false
		const validate = ajv.compile(this.definition);
		return validate(data);

	}

	errors() {
		console.log("HERE")
		console.log(this)
		console.log(this.definition)
		const errors = []

		if (!this.definition) {
			errors.push(InvalidSchemaDefinition('Schema definition is not valid JSON'))
		}

		if (this.definition && !ajv.validateSchema(this.definition)) {
			errors.push(InvalidSchemaDefinition(ajv.errors))
		}

		if (!this.id || typeof this.id !== 'string') {
			errors.push(MissingProperty("Missing Property 'id' in schema definition"))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}

	displayObject(properties = this.definition.properties, order = this.definition.order) {

		const entires = Object.entries(properties)

		const mapped = entires.map(i=> {
			return {obj: i[1], name: i[0], order: (order && order.includes(i[0]) ? order.indexOf(i[0]) : undefined)}
		})

		const sorted = collection.sortBy(
			mapped,  ['order', 'name']);

		return sorted
	}

	derefSchema() {
		return new Schema(this.id, deref(this.definition))
	}

}