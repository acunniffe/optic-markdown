import {commentAnnotationRegex} from "../grammar/Regexes";
import fs from 'fs'
import {NoAnnotationsFound, ParseError} from "../../Errors";
const compiledGrammar  = require('../grammar/compiled/optic-md-comment')
const nearley = require("nearley")

export function parse(file, callback) {

	fs.readFile(file, 'utf8', (err, contents)=> {

		const errors = []

		if (err) {
			errors.push(err)
			return callback(undefined, errors)
		} else {
			parseString(contents, callback)
		}
	})

}

export function parseString(contents = "", callback) {

	const errors = []

	const annotations = contents.match(commentAnnotationRegex)

	const annotationRanges = []

	var match
	while (match = commentAnnotationRegex.exec(contents)) {
		const start = match.index
		const end = commentAnnotationRegex.lastIndex
		annotationRanges.push({
			start,
			end
		})
	}

	if (annotations === null) {
		errors.push(NoAnnotationsFound())
		return callback(undefined, errors)
	}

	let i = -1
	const parsed = annotations.map(a=> {
		i++
		try {
			const parser = new nearley.Parser(compiledGrammar);
			parser.feed(a);
			return {...parser.results[0], range: annotationRanges[i]}
		} catch (err) {
			return ParseError(err)
		}
	})

	const parseErrors = parsed.filter(i=> i.isError)
	const parsedAnnotations = parsed.filter(i=> !i.isError)

	callback(parsedAnnotations, errors.concat(parseErrors), contents)
}