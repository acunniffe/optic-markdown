import {parse} from "./stages/ParseStage";
import {processAnnotations} from "./stages/ProcessStage";

export function parseMarkdown(file) {
	parse('examples/NoAnnotations.md', (results, errors1) => {
		processAnnotations(results, (sdkObjects, errors2)=> {
			callback(sdkObjects, errors1.concat(errors2))
		})
	})
}