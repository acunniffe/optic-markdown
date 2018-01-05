import {Annotation} from "../Annotation";
import {Schema} from "../../sdk-objects/Schema";

export function processAnnotations(rawAnnotations, callback) {

	const annotations = rawAnnotations.map(i=> new Annotation(i.type, i.properties, i.codeBlock))

	const validAnnotations = annotations.filter(i=> i.isValid())

	const asSDKObjects = validAnnotations.map(annotationToSdkObject)

	const validSDKObjects = asSDKObjects.filter(i=> i.isValid())

	const errors = annotations.filter(i=> !i.isValid())
		  .concat(asSDKObjects.filter(i=> !i.isValid()))

	callback(validSDKObjects, errors.length ? null : errors)

}

export function annotationToSdkObject(annotation) {

	//@todo clean up error flow
	switch (annotation.definitionType) {
		case 'schema-def':

			const id = annotation.getProperty('id')
			let json;

			try {
				json = JSON.parse(annotation.codeBlock)
			} catch(e) {

			}

			return new Schema(id, json)

		case 'lens-def':
			return ''
	}

}