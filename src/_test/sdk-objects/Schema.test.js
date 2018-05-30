import assert from 'assert'
import equals from 'deep-equal'
import {addInternalRefsToSchemas, allInternalRefs, derefAllSchemas, Schema} from "../../sdk-objects/Schema";
import Ajv from "ajv/lib/ajv";

describe('Schemas', function () {
	describe('that is valid', function () {

		it('works for an object schema', function () {

			const testSchema2 = {
				title: "Test",
				description: "testing",
				type: 'object',
				properties: {
					one: {type: 'integer'},
					two: {type: 'integer'},
				}
			}
			assert(new Schema('Test', testSchema2).isValid())

		});

	});

	describe('an invalid schema', function () {
		const error = 'The schema is not valid.'
		it('fails when invalid types are used', function () {

			const testSchema = {
				type: 'hello',
			}

			assert(!new Schema('Test', testSchema).isValid())
		})

	})

	describe('validation', function () {

		const testSchema = {
			title: "Test",
			type: 'object',
			properties: {
				test: {type: 'string'},
			}
		}

		it('validates test schema', function () {
			const schema = new Schema('Test', testSchema)
			assert(schema.matches({test: 'world'}))
		})

	})

	it("can get ref from path", () => {
		const nestedSchema = new Schema('Parameter', {
			title: 'Parameter',
			version: '1.0.0',
			slug: 'js-example-route-parameter',
			type: 'object',
			required: ['method'],
			properties: {
				'in': {type: 'string'},
				name: {type: 'string'}
			}
		});

		const schema = new Schema('Route', {
			title: 'Route',
			version: '1.0.0',
			slug: 'js-example-route',
			type: 'object',
			properties: {
				parameters: {
					type: 'array',
					items: {
						$ref: '#/definitions/parameter'
					}
				}
			},
			definitions: {
				parameter: nestedSchema.definition
			}
		})

		assert(
			equals(schema.derefSchema().definition.properties.parameters.items, nestedSchema.definition))


	})

	describe('internal references', () => {

		var ajv = new Ajv();
		ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));


		const nestedReffedSchema = new Schema('thing_deep', {
			type: 'object',
			properties: {
				number: {
					type: 'number'
				},
				obj1: {
					type: 'array',
					items: {
						$ref: '#/definitions/internal/thing1'
					}
				},
			}
		})

		const reffedSchema = new Schema('thing1', {
			type: 'object',
			properties: {
				number: {
					type: 'number'
				}
			}
		})

		const schema = new Schema('Route', {
			type: 'object',
			properties: {
				obj1: {
					type: 'array',
					items: {
						$ref: '#/definitions/internal/thing1'
					}
				}
			}
		})

		it('will fail to validate if an internal reference is not found', () => {
			assert(!schema.isValid())
		})

		it('can find all internal references at any level', () => {
			assert(equals(allInternalRefs(schema), ['thing1']))
		})

		it('can resolve internal refs', () => {
			const newSchemas = addInternalRefsToSchemas([schema, reffedSchema, nestedReffedSchema])
			assert(JSON.stringify(newSchemas[0].definition) === '{"type":"object","properties":{"obj1":{"type":"array","items":{"$ref":"#/definitions/internal/thing1"}}},"definitions":{"internal":{"thing1":{"type":"object","properties":{"number":{"type":"number"}}}},"optic":{"code":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"code"},"value":{"type":"string"}},"title":"Code","default":{"value":"code","_valueFormat":"code"}},"token":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"token"},"value":{"type":"string"}},"title":"Token","default":{"value":"token","_valueFormat":"token"}}}}}')
			assert(JSON.stringify(newSchemas[1].definition) === '{"type":"object","properties":{"number":{"type":"number"}},"definitions":{"internal":{},"optic":{"code":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"code"},"value":{"type":"string"}},"title":"Code","default":{"value":"code","_valueFormat":"code"}},"token":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"token"},"value":{"type":"string"}},"title":"Token","default":{"value":"token","_valueFormat":"token"}}}}}')
			assert(JSON.stringify(newSchemas[2].definition) === '{"type":"object","properties":{"number":{"type":"number"},"obj1":{"type":"array","items":{"$ref":"#/definitions/internal/thing1"}}},"definitions":{"internal":{"thing1":{"type":"object","properties":{"number":{"type":"number"}}}},"optic":{"code":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"code"},"value":{"type":"string"}},"title":"Code","default":{"value":"code","_valueFormat":"code"}},"token":{"type":"object","required":["_valueFormat","value"],"properties":{"_valueFormat":{"type":"string","const":"token"},"value":{"type":"string"}},"title":"Token","default":{"value":"token","_valueFormat":"token"}}}}}')

		})

		it('can deref all schemas', ()=> {
			const newSchemas = addInternalRefsToSchemas([schema, reffedSchema, nestedReffedSchema])
			assert(equals(newSchemas.map(i=> i.isValid()), [true, true, true]) )
			const dereffed = derefAllSchemas(newSchemas)
			assert(equals(dereffed.map(i=> i.isValid()), [true, true, true]) )
		})

	})

});