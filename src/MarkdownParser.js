import grammar from './grammar/compiled/optic-md-comment'
import fs from 'fs'
import {commentAnnotationRegex} from "./grammar/Regexes";
import {NoAnnotationsFound, ParseError} from "./Errors";
import nearley from 'nearley'

const compiledGrammar = nearley.Grammar.fromCompiled(grammar)

export function parseMarkdown(file, callback) {
	fs.readFile(file, 'utf8', (err, contents)=> {

		const errors = []

		if (err) {
			errors.push(err)
			return callback(errors)
		}

		const annotations = contents.match(commentAnnotationRegex)

		if (annotations === null) {
			errors.push(NoAnnotationsFound(file))
			return callback(errors)
		}

		const parsed = annotations.map(a=> {
			try {
				const parser = new nearley.Parser(compiledGrammar);
				console.warn(file)
				console.warn(a)
				parser.feed(a);
				console.warn(parser.results)
				return parser.results[0]
			} catch (err) {
				return ParseError(err)
			}
		})

		console.log(parsed)

		const parseErrors = parsed.filter(i=> i.isError)
		const parsedAnnotations = parsed.filter(i=> !i.isError)

		// console.log(errors)
		// console.log(parsedAnnotations)

		callback(contents)
	})
}