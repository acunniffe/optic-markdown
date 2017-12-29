import assert from 'assert'
import {parseMarkdown} from "../MarkdownParser";

describe('markdown parser', ()=> {

	it('no results a file without annotations', (done)=> {
		parseMarkdown('examples/NoAnnotations.md', (errors, results)=> {
			assert(errors[0].type === 'NoAnnotationsFound')
			assert(!results)
			done()
		})
	})

	it('finds both types of valid annotations', (done)=> {
		parseMarkdown('examples/TwoAnnotations.md', (errors, results)=> {
			console.log(errors)
			console.log(results)
			done()
		})
	})

})