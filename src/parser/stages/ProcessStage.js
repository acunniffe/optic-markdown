import {Annotation} from "../Annotation";
import {addInternalRefsToSchemas, derefAllSchemas, Schema} from "../../sdk-objects/Schema";
import {Dependencies} from "../../sdk-objects/Dependencies";
import {Description} from "../../sdk-objects/Description";
import {Finder} from "../../sdk-objects/lenses/Finder";
import {Component} from "../../sdk-objects/lenses/Component";
import {Lens} from "../../sdk-objects/lenses/Lens";
import {Metadata} from "../../sdk-objects/Metadata";
import {getAssignmentProperty} from "../../helpers/AST";
import {Snippet} from "../../sdk-objects/lenses/Snippet";
import {Variable} from "../../sdk-objects/lenses/Variable";
import {Container} from "../../sdk-objects/Container";
import {Transformation} from "../../sdk-objects/Transformation";
import {collectDuplicateIdErrors} from "../../helpers/DuplicateIdValidator";

export function processAnnotations(rawAnnotations, callback) {

	const sdkAnnotations = rawAnnotations.filter(i=> i.type === 'annotationPair' || i.type === 'annotation').map(i=> new Annotation(i.type, i.properties, i.codeBlock, i.language, i.range))

	const dependenciesAnnotation = (()=> {
		const allDependencyLists = rawAnnotations.filter(i=> i.type === 'dependenciesAnnotation').map(i=> i.dependencies)
		const mergedDependencies = [].concat.apply([], allDependencyLists);

		return new Dependencies(mergedDependencies)
	})()

	const metadataAnnotation = (()=> {
		const annotation = rawAnnotations.find(i=> i.type === 'metadataAnnotation')

		if (annotation) {
			return new Metadata(
				getAssignmentProperty('author', annotation.properties),
				getAssignmentProperty('name', annotation.properties),
				getAssignmentProperty('version', annotation.properties))
		} else {
			return Metadata.empty
		}
	})()

	const validAnnotations = sdkAnnotations.filter(i=> i.isValid())

	const asSDKObjects = validAnnotations.map(annotationToSdkObject)

	//post processing for schema
	const schemas = asSDKObjects.filter(i=> i instanceof Schema)
	addInternalRefsToSchemas(schemas)
	derefAllSchemas(schemas)

	const validSDKObjects = asSDKObjects.filter(i=> i.isValid())

	const errors = sdkAnnotations.filter(i=> !i.isValid()).map(i=> i.errors())
		     .concat(asSDKObjects.filter(i=> !i.isValid()).map(i=> i.errors()))
	   		 .concat(collectDuplicateIdErrors(validSDKObjects))


	const description = new Description(metadataAnnotation, dependenciesAnnotation.asArray(),
		validSDKObjects.filter(i=> i instanceof Schema),
		validSDKObjects.filter(i=> i instanceof Lens),
		validSDKObjects.filter(i=> i instanceof Container),
		validSDKObjects.filter(i=> i instanceof Transformation),
	)

	callback(description, errors)

}

export function annotationToSdkObject(annotation) {

	const range = annotation.range

	//@todo clean up error flow
	switch (annotation.definitionType) {
		case 'schema-def': {

			const id = annotation.getProperty('id')
			let json;

			try {
				json = JSON.parse(annotation.codeBlock)
			} catch (e) {
				console.log(e)
			}

			return new Schema(id, json, range)
		}
		case 'lens-def': {
			const name = annotation.getProperty('name')
			const id = annotation.getProperty('id')
			const schema = annotation.getProperty('schema')

			const languagePrimary = annotation.getProperty('language')
			const languageSecondary = annotation.language

			const snippet = new Snippet(annotation.codeBlock, languagePrimary || languageSecondary)

			const codeComponents = annotation.getPropertiesOfType('finderProperty').map(f => {
				const finder = new Finder(f)
				return new Component({type: 'code', finder, propertyPath: f.propertyPath.keys})
			})

			const schemaComponents = annotation.getPropertiesOfType('mapSchemaProperty').map(m => {
				return new Component({
					type: 'schema',
					propertyPath: m.propertyPath.keys,
					schema: m.schema,
					unique: m.unique
				})
			})

			const variableComponents = annotation.getPropertiesOfType('variableProperty').map(v => {
				return new Variable(v)
			})

			const subcontainers = annotation.getPropertiesOfType("containerProperty").map(c => {
				const pulls = c.properties.filter(i => i.type === 'pullProperty').map(i => i.schema)

				const childrenRule = (() => {
					const property = c.properties.find(i => i.type === 'childrenRuleProperty')
					if (property) {
						return property.rule
					} else {
						return 'any'
					}
				})()

				const schemaComponents = c.properties.filter(i => i.type === 'mapSchemaProperty').map(m => {
					return new Component({
						type: 'schema',
						propertyPath: m.propertyPath.keys,
						schema: m.schema,
						unique: m.unique
					})
				})

				return new Container(c.name, true, undefined, pulls, childrenRule, schemaComponents)
			})

			return new Lens(name, id, schema, snippet, annotation.scope, [...codeComponents, ...schemaComponents], [], variableComponents, subcontainers, range)
		}
		case 'container-def': {
			const name = annotation.getProperty('name')

			const languagePrimary = annotation.getProperty('language')
			const languageSecondary = annotation.language

			const snippet = new Snippet(annotation.codeBlock, languagePrimary || languageSecondary)

			const pullProperties = annotation.getPropertiesOfType('pullProperty').map(m => {
				return m.schema
			})

			const childrenRule = (annotation.getPropertiesOfType('childrenRuleProperty')[0] || {}).rule || 'any'

			const schemaComponents = annotation.getPropertiesOfType('mapSchemaProperty').map(m => {
				return new Component({
					type: 'schema',
					propertyPath: m.propertyPath.keys,
					schema: m.schema,
					unique: m.unique
				})
			})

			return new Container(name, false, snippet, pullProperties, childrenRule, schemaComponents, range)
		}

		case 'transformation-def': {
			const yields = annotation.getProperty('yields')
			const id = annotation.getProperty('id')
			const input = annotation.getProperty('input')
			const output = annotation.getProperty('output')
			const script = annotation.codeBlock

			return new Transformation(yields, id, input, output, script, range)
		}
	}
}

export const DefaultContext = {schemas: []}