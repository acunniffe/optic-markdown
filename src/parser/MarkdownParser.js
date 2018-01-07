import {parse} from "./stages/ParseStage";
import {processAnnotations} from "./stages/ProcessStage";
import {validateDescription} from "./stages/ValidateStage";

export function parseMarkdown(filePath, callback) {
	parse(filePath, (results, errors1) => {
		processAnnotations(results, (description, errors2)=> {
			validateDescription(description, errors1.concat(errors2), (description, errors3) => {
				callback(description, errors3)
			})
		})
	})
}