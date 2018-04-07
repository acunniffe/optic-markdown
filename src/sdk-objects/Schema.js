import Ajv from 'ajv'
import deref from 'json-schema-deref-sync'
import collection from 'lodash/collection'
import {InvalidId, InvalidSchemaDefinition, MissingProperty} from "../Errors";
import {validatePackageExportName} from "../parser/grammar/Regexes";
var ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

export class Schema {

	constructor(id, json, range) {
		this.id = id;
		this.definition = json;
		this.range = range
	}

	matches(data) {
		if (!this.isValid()) return false
		const validate = ajv.compile(this.definition);
		return validate(data);

	}

	errors() {
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

		if (!validatePackageExportName(this.id)) {
			errors.push(InvalidId(this.id))
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