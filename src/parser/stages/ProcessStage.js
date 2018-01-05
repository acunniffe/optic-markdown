import {Annotation} from "../Annotation";
import {Schema} from "../../sdk-objects/Schema";
import {Dependencies} from "../../sdk-objects/Dependencies";
import {Description} from "../../sdk-objects/Description";

export function processAnnotations(rawAnnotations, callback) {

	const annotations = rawAnnotations.filter(i=> i.type === 'annotationPair' || i.type === 'annotation').map(i=> new Annotation(i.type, i.properties, i.codeBlock))

	const dependenciesAnnotation = (()=> {
		const allDependencyLists = rawAnnotations.filter(i=> i.type === 'dependenciesAnnotation').map(i=> i.dependencies)
		const mergedDependencies = [].concat.apply([], allDependencyLists);

		return new Dependencies(mergedDependencies)
	})()

	const validAnnotations = annotations.filter(i=> i.isValid())

	const asSDKObjects = validAnnotations.map(annotationToSdkObject)

	const validSDKObjects = asSDKObjects.filter(i=> i.isValid())

	const errors = annotations.filter(i=> !i.isValid())
		  .concat(asSDKObjects.filter(i=> !i.isValid()))

	const description = new Description(null, dependenciesAnnotation,
		validSDKObjects.filter(i=> i instanceof Schema),
		[]
	)

	callback(description, errors.length ? null : errors)

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