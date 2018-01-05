import nearley from "nearley";
import {commentAnnotationRegex} from "../grammar/Regexes";
import grammar from '../grammar/compiled/optic-md-comment'
import fs from 'fs'
import compiledGrammar from '../grammar/compiled/optic-md-comment'
import {NoAnnotationsFound, ParseError} from "../../Errors";

export function parse(file, callback) {

	fs.readFile(file, 'utf8', (err, contents)=> {

		const errors = []

		if (err) {
			errors.push(err)
			return callback(undefined, errors)
		}

		const annotations = contents.match(commentAnnotationRegex)

		if (annotations === null) {
			errors.push(NoAnnotationsFound(file))
			return callback(undefined, errors)
		}

		const parsed = annotations.map(a=> {
			try {
				const parser = new nearley.Parser(compiledGrammar);
				parser.feed(a);
				return parser.results[0]
			} catch (err) {
				return ParseError(err)
			}
		})

		const parseErrors = parsed.filter(i=> i.isError)
		const parsedAnnotations = parsed.filter(i=> !i.isError)

		callback(parsedAnnotations, errors.concat(parseErrors))
	})

}