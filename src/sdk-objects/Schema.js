import Ajv from 'ajv'
import deref from 'json-schema-deref-sync'
import collection from 'lodash/collection'
import {InvalidId, InvalidSchemaDefinition, InvalidTransformationDefinition, MissingProperty} from "../Errors";
import {validatePackageExportName} from "../parser/Regexes";
import deepMapKeys from 'deep-map-keys';
import {types} from 'optic-js-common'

const ajv = new Ajv();
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));

export class Schema {

	constructor(id, definition, internal = false, range) {

		delete definition.id

		this.id = id;
		this.internal = internal
		this.definition = definition;
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

		let compileFailed = false
		try {
			ajv.compile(this.definition)
		} catch (error) {
			compileFailed = error
		}

		if (compileFailed) {
			errors.push(InvalidSchemaDefinition(compileFailed))
		}

		if (!this.id || typeof this.id !== 'string') {
			errors.push(MissingProperty("Missing Property 'id' in schema definition"))
		} else {
			if (!validatePackageExportName(this.id)) {
				return errors.push(new InvalidSchemaDefinition('Schema "id" is not valid'))
			}
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
		const dereffed = deref(this.definition)
		delete dereffed.definitions
		return new Schema(this.id, dereffed)
	}

	allInternalRefs() {
		const refs = []
		const internalPath = '#/definitions/internal/'
		deepMapKeys(this.definition, (key, value) => {
			if (key === '$ref') {
				if (value.indexOf(internalPath) === 0) {
					refs.push(value.split(internalPath)[1])
				}
				return key;
			}
		})

		return refs;
	}

}

export function allInternalRefs(schema) {
	const refs = []
	const internalPath = '#/definitions/internal/'
	deepMapKeys(schema, (key, value) => {
		if (key === '$ref') {
			if (value.indexOf(internalPath) === 0) {
				refs.push(value.split(internalPath)[1])
			}
			return key;
		}
	})

	return refs;
}

export function addInternalRefsToSchemas(allSchemas) {

	const mapping = {}
	allSchemas.filter(i=> !i.internal).forEach(schema=> mapping[schema.id] = Object.assign({}, schema))

	const refMappings = {}
	allSchemas.forEach(schema=> {
		const internalRefs = allInternalRefs(schema)
		refMappings[schema.id] = internalRefs
	})

	function flattenTree(required, set = new Set([])) {
		required.forEach(req=> {
			if (!set.has(req)) {
				set.add(req)
				flattenTree(refMappings[req], set)
			}
		})
		return set
	}

	Object.keys(refMappings).forEach((value)=> {
		const flat = flattenTree(refMappings[value])
		const internal = {}
		flat.forEach(ref=> {
			internal[ref] = mapping[ref].definition
		})

		const schema = allSchemas.find(i=> i.id === value)
		schema.definition = {
			...schema.definition,
			definitions: {
				...schema.definition.definitions,
				internal: internal,
				optic: {
					code: types.RawCode,
					token: types.Token
				}
			}
		}
	})

	return allSchemas
}

export function derefAllSchemas(schemas) {
	schemas.forEach(schema=> {
		if (schema.isValid()) {
			try {
				const newOne = schema.derefSchema()
				schema.definition = newOne.definition
			} catch (error) {

			}
		}
	})

	return schemas
}
