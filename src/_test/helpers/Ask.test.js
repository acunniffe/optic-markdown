import assert from 'assert'
import {Ask, askToSchemaField} from "../../helpers/Ask";
import equals from 'deep-equal'

describe('Ask', () => {

	const fixture = () => new Ask()

	it('new instances are empty', () => {
		assert(!fixture().size())
	})

	it('primitive values can be set', () => {
		const f = fixture()
		f.forPrimitive('key', 'desc', 'boolean')
		assert(equals(f._fields[0], {type: 'primitive', key: 'key', description: 'desc', dataType: 'boolean'}))
	})

	it('lens values can be set', () => {
		const f = fixture()
		f.forLens('key', 'desc', 'test:package/schema')
		assert(equals(f._fields[0], {type: 'lens', key: 'key', description: 'desc', withSchema: 'test:package/schema'}))
	})

	it('schema values can be set', () => {
		const f = fixture()
		f.forSchema('key', 'desc')
		assert(equals(f._fields[0], {type: 'schema', key: 'key', description: 'desc'}))
	})

	describe('schema generation', () => {

		it('primitive fields to json schema', () => {
			const result = askToSchemaField({type: 'primitive', key: 'key', description: 'desc', dataType: 'boolean'})
			assert(equals(result, {key: {description: 'desc', type: 'boolean'}}))
		})

		it('lens fields to json schema', () => {
			const result = askToSchemaField({
				type: 'lens',
				key: 'key',
				description: 'desc',
				withSchema: 'test:package/schema'
			})
			assert(equals(result, {
					key:
						{
							description: 'desc',
							type: 'string',
							_opticValidation: {accepts: 'lens', withSchema: 'test:package/schema'}
						}
				}
			))
		})

		it('lens fields to json schema', () => {
			const result = askToSchemaField({type: 'schema', key: 'key', description: 'desc'})
			assert(equals(result, {
					key:
						{
							description: 'desc',
							type: 'string',
							_opticValidation: {accepts: 'schema'}
						}
				}
			))
		})

		it('throws when field is invalid', () => {
			assert.throws(() => askToSchemaField({type: 'fake'}))
		})

		it('can generate a valid schema from ask instance', () => {
			const f = fixture()
			f.forPrimitive('string', 'desc', 'string')
			f.forLens('lens', 'to do X', 'test:package/schema')
			f.forSchema('schema', 'for this purpose')
			f.forPrimitive('X?', 'desc', 'boolean')
			f.forObject('testObject', 'desc', 'test:package/schema')
			f.forFile('testFile', 'desc')
			f.for('testDynamic', 'desc', () => {}) //should not show up

			assert(equals(f.toJsonSchema(), {
					"type": "object",
					"properties": {
						"string": {"description": "desc", "type": "string"},
						"lens": {
							"description": "to do X",
							"type": "string",
							"_opticValidation": {"accepts": "lens", "withSchema": "test:package/schema"}
						},
						"schema": {
							"description": "for this purpose",
							"type": "string",
							"_opticValidation": {"accepts": "schema"}
						},
						"X?": {"description": "desc", "type": "boolean"},
						"testObject": {
							"description": "desc",
							"type": "string",
							"_opticValidation": {"accepts": "object", "withSchema": "test:package/schema"}
						},
						"testFile": {
							"description": "desc",
							"type": "string",
							"_opticValidation": {
								"accepts": "file"
							}
						}
					},
					"_order": ["string", "lens", "schema", "X?", "testObject", "testFile"],
					"required": ["string", "lens", "schema", "X?", "testObject", "testFile"]
				}
			))
		})

		it('can generate a valid schema for dynamic ask instance', () => {
			const f = fixture()

			f.for('key', 'description', (a) => {
				return {}
			})

			f.for('key2', 'description', (a) => {
				return {}
			})

			const dynamicAsks = f.collectDynamicAsk()

			assert(equals(dynamicAsks, {
				key:
					{
						description: 'description',
						func: 'function (a) {\n\t\t\t\treturn {};\n\t\t\t}'
					},
				key2:
					{
						description: 'description',
						func: 'function (a) {\n\t\t\t\treturn {};\n\t\t\t}'
					}
			}))

		})

	})

})
