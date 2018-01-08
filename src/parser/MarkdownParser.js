import {parse} from "./stages/ParseStage";
import {processAnnotations} from "./stages/ProcessStage";
import {validateDescription} from "./stages/ValidateStage";

export function parseMarkdown(filePath, callback) {
	parse(filePath, (results, errors1) => {
		if (results) {
			processAnnotations(results, (description, errors2) => {
				callback(description, errors1.concat(errors2))
			})
		} else {
			callback(null, errors1)
		}
	})
}