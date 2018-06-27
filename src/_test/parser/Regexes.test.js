import assert from 'assert'
import {commentAnnotationRegex, annotationContentRegex} from "../../parser/Regexes";

describe('comment annotation regex', ()=> {

	it('matches just a comment', ()=> {
		const results = "Hello <!-- testing this --> world".match(commentAnnotationRegex)
		assert(results.length === 1)
		assert(results[0] === '<!-- testing this -->')
	})

	it('matches multiple when present', ()=> {
		const results = "Hello <!-- testing this --> world  <!-- testing that --> ".match(commentAnnotationRegex)
		assert(results.length === 2)
	})

	it('matches a comment with a code block', ()=> {
		const results = "Hello <!-- testing this -->  \n ```javascript \n hello \n ``` world".match(commentAnnotationRegex)
		assert(results.length === 1)
		assert(results[0] === '<!-- testing this -->  \n ```javascript \n hello \n ```')
	})

	it('will not match a comment with a code block if non-whitespace separates them', ()=> {
		const results = "Hello <!-- testing this -->  other text... ```javascript \n hello \n ``` world".match(commentAnnotationRegex)
		assert(results.length === 1)
		assert(results[0] === '<!-- testing this -->')
	})

})

describe('annotation content regex', ()=> {

	it('matches lens & json', ()=> {
		const results = "Lens {}".match(annotationContentRegex())
		assert(results.length === 1)
		assert(results[0] === 'Lens {}')
	})

	it('matches schema & json', ()=> {
		const results = "Schema {}".match(annotationContentRegex())
		assert(results.length === 1)
		assert(results[0] === 'Schema {}')
	})

	it('matches Transformation & json', ()=> {
		const results = "Transformation {}".match(annotationContentRegex())
		assert(results.length === 1)
		assert(results[0] === 'Transformation {}')
	})

	it('matches Package & json', ()=> {
		const results = "Package {}".match(annotationContentRegex())
		assert(results.length === 1)
		assert(results[0] === 'Package {}')
	})

})
