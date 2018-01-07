import assert from 'assert'
import {Schema} from "../../sdk-objects/Schema";
import {getPath} from "../../validation/GetPath";
import equals from 'deep-equal'

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


describe('check path', () => {

	it('flat path exists', ()=> {
		assert (equals( getPath(testSchema, ['one']), {type: 'integer'}))
	})

	it('nested path exists', ()=> {
		assert (equals( getPath(testSchema, ['three', 'once']), {type: 'string'}))
	})

	it('invalid paths fail', ()=> {
		assert(!getPath(testSchema, ['six','seven','eight']), false)
		assert(!getPath(testSchema, ['three','nine']), false)
	})

});