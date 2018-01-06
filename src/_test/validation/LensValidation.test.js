import assert from 'assert'
import {Schema} from "../../sdk-objects/Schema";
import {Component} from "../../sdk-objects/lenses/Component";
import {Lens} from "../../sdk-objects/lenses/Lens";
import {validateLens} from "../../validation/ValidateLens";

describe.only('Lens validation', ()=> {

	const testItemSchema = new Schema('test-item', {
		title: 'TestItem',
		slug: 'test-item',
		version: '0.0.1-beta',
		description: 'testing',
		type: 'object',
		properties: {
			single: {type: 'string'}
		}
	})

	const testSchema = new Schema('test-slug', {
		title: 'Test',
		slug: 'test-slug',
		version: '0.0.1-beta',
		description: 'testing',
		type: 'object',
		required: ['one'],
		properties: {
			one: {type: 'integer'},
			two: {type: 'integer'},
			three: {
				type: 'object',
				required: ['fine', 'once'],
				properties: {
					fine: {type: 'boolean'},
					once: {type: 'string'}
				}
			},
			arrayTest: {
				type: 'array',
				items: {
					$ref: '#/definitions/testItem'
				}
			},
			arrayTestWrong: {
				type: 'array',
				items: {
					$ref: '#/definitions/delta'
				}
			}
		},
		definitions: {
			testItem: testItemSchema.definition,
			delta: {
				type: 'object',
				properties: {
					value: {type: 'integer'}
				}
			}
		}
	})

	const schemas = [testSchema, testItemSchema]

	it('properly validates lenses with all the required fields set', ()=> {

		const lens = new Lens('test', 'test-slug', '', 'internal', [
			new Component('code', null, ['one']),
			new Component('code', null, ['three', 'fine']),
			new Component('code', null, ['three', 'once']),
		], [])

		const validityCheck = validateLens(lens, schemas)
		assert(validityCheck.result)
		assert(validityCheck.difference.length === 0)
	})

	it('properly validates lenses when required fields are missing', ()=> {

		const lens = new Lens('test', 'test-slug', '', 'internal', [
			new Component('code', null, ['one'])
		], [])

		const validityCheck = validateLens(lens, schemas)
		assert(!validityCheck.result)
		assert(validityCheck.difference.length === 2)
	})


})