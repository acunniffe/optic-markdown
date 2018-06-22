import {annotationContentRegex, commentAnnotationRegex} from "../Regexes";
import fs from 'fs'
import {NoAnnotationsFound, ParseError} from "../../Errors";

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

	const annotations = []

	var match
	while (match = commentAnnotationRegex.exec(contents)) {
		const start = match.index
		const end = commentAnnotationRegex.lastIndex

		const a = {
			range: {
				start,
				end
			},
			contents: match[1]
		}

		if (match[4]) { //has code block
			a.codeBlock = match[4].substring(match[4].indexOf('\n')+1)
		}
		annotations.push(a)
	}

	if (!annotations.length) {
		errors.push(NoAnnotationsFound())
		return callback(undefined, errors)
	}

	let i = -1
	const parsed = annotations.map(a=> {
		i++
		try {

			const matches = annotationContentRegex().exec(a.contents);

			if (!matches) {
				return ParseError('Could not parse annotation at ' + annotations[i].range.start + '. Check syntax and try again')
			}

			const sdkType = matches[1]
			const description = JSON.parse(matches[2])
			return {sdkType, description, range: a.range, codeBlock: a.codeBlock}
		} catch (err) {
			return ParseError(err)
		}
	})

	const parseErrors = parsed.filter(i=> i.isError)
	const parsedAnnotations = parsed.filter(i=> !i.isError)

	callback(parsedAnnotations, errors.concat(parseErrors), contents)
}
