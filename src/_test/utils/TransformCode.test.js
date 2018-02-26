import assert from 'assert'
import {extractFunction} from "../../utils/TransformationCode";

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

})