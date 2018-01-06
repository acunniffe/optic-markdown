import assert from 'assert'
import equals from 'deep-equal'
import {Schema} from "../../sdk-objects/Schema";

describe('Schemas', function() {
	describe('this is valid', function() {

		it('works for an object schema', function() {

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

	describe('an invalid schema', function() {
		const error = 'The schema is not valid.'
		it('fails when invalid types are used', function () {

			const testSchema = {
				type: 'hello',
			}

			assert(!new Schema('Test', testSchema).isValid())
		})

	})

	describe('validation', function() {

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

	describe('display', function () {

		function testSchemaWithFields(properties, order) {
			const testSchema = {
				title: "Test",
				slug: "test-slug",
				version: "0.0.1-beta",
				description: "testing",
				type: 'object',
				properties,
				order
			}

			return new Schema('Test', testSchema)

		}

		it('order is alphabetical', function () {
			const schema = testSchemaWithFields({
				d: {type: 'string'},
				b: {type: 'string'},
				c: {type: 'string'},
				a: {type: 'string'}
			})
			const order = schema.displayObject().map(i=> i.name)
			assert(equals(order, ['a', 'b', 'c', 'd']))
		})

		it('order can be overridden', function () {
			const schema = testSchemaWithFields({
				d: {type: 'string'},
				b: {type: 'string'},
				c: {type: 'string'},
				a: {type: 'string'}
			}, ['d', 'c', 'b', 'a'])

			const order = schema.displayObject().map(i=> i.name)

			console.log(order)
			assert(equals(order, ['d', 'c', 'b', 'a']))

		})

		it('order can be overridden selectively', function () {
			const schema = testSchemaWithFields({
				d: {type: 'string'},
				b: {type: 'string'},
				c: {type: 'string'},
				a: {type: 'string'},
				e: {type: 'string'},
				f: {type: 'string'},
				g: {type: 'string'}
			}, ['a', 'c', 'b'])

			const order = schema.displayObject().map(i=> i.name)

			assert(equals(order, ['a', 'c', 'b', 'd', 'e', 'f', 'g']))

		})

	})

	it("can get ref from path", ()=> {
		const nestedSchema = new Schema('Parameter',{
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

		const schema = new Schema('Route',{
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

});