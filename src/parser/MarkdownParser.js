import {parse, parseString} from "./stages/ParseStage";
import {processAnnotations} from "./stages/ProcessStage";
import {validateDescription} from "./stages/ValidateStage";
import {Schema} from "../sdk-objects/Schema";
import {Lens} from "../sdk-objects/Lens";
import {Package} from "../sdk-objects/Package";
import {Transformation} from "../sdk-objects/Transformation";
import {Description} from "../sdk-objects/Description";


export function parseMarkdownFile(filePath, callback) {
	parse(filePath, (results, errors1, contents) => {
		if (results) {
			processAnnotations(results, (validSDKObjects, errors2) => {
				const description = new Description(
					validSDKObjects.find(i=> i instanceof Package),
					validSDKObjects.filter(i=> i instanceof Schema).map(i=> i.cleanForDescription()),
					validSDKObjects.filter(i=> i instanceof Lens).map(i=> i.cleanForDescription()),
					validSDKObjects.filter(i=> i instanceof Transformation))

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
			processAnnotations(results, (validSDKObjects, errors2) => {
				const description = new Description(
					validSDKObjects.find(i=> i instanceof Package),
					validSDKObjects.filter(i=> i instanceof Schema).map(i=> i.cleanForDescription()),
					validSDKObjects.filter(i=> i instanceof Lens).map(i=> i.cleanForDescription()),
					validSDKObjects.filter(i=> i instanceof Transformation))


				callback(description, errors1.concat(errors2), string)
			})
		} else {
			callback(null, errors1)
		}
	})
}
