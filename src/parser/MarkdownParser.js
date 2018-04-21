import {parse, parseString} from "./stages/ParseStage";
import {processAnnotations} from "./stages/ProcessStage";
import {validateDescription} from "./stages/ValidateStage";

export function parseMarkdownFile(filePath, callback) {
	parse(filePath, (results, errors1, contents) => {
		if (results) {
			processAnnotations(results, (description, errors2) => {
				callback(description, errors1.concat(errors2), contents)
			})
		} else {
			callback(null, errors1)
		}
	})
}

export function parseMarkdownString(string, callback) {
	parseString(string, (results, errors1) => {
		if (results) {
			processAnnotations(results, (description, errors2) => {
				callback(description, errors1.concat(errors2))
			})
		} else {
			callback(null, errors1)
		}
	})
}