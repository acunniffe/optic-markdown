import assert from 'assert'
import {extractAskCalls, extractFunction} from "../../helpers/TransformationCode";

describe('Transformation Code Extraction', ()=> {

	it('extracts & transforms raw javascript for the transform function', ()=> {

		const raw = ` \n function transform(test) {  return { me: ()=> {}}  } `

		assert(extractFunction(raw, 'transform') === 'function transform(test) {\n' +
			'  return { me: function me() {} };\n' +
			'}')
	})

	it('will fail if error parsing', ()=> {
		const raw = `))9f`
		assert(!extractFunction(raw, 'transform'))
	})


	describe('Ask', ()=> {

		it('can extract ask statements from raw code', ()=> {
			const raw = `
				ask.forPrimitive('Input1', 'for use', 'string')
				ask.forPrimitive('Input2', 'for use', 'string')
			`
			const results = extractAskCalls(raw)
			assert(results.size() === 2)
		})

	})
})