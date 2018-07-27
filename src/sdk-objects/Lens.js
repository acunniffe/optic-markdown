import {
	InvalidId,
	InvalidLensAnnotation,
	InvalidLensDefinition,
	InvalidPackageAnnotation,
	InvalidSchemaDefinition,
	MissingProperty
} from "../Errors";
import {validatePackageExportName} from "../parser/Regexes";

import Ajv from 'ajv'
const ajv = new Ajv();


const validation = {
	"type": "object",
	"required": [
		"id",
		"snippet",
		"schema",
	],
	"properties": {
		"name": {
			"type": "string"
		},
		"id": {
			"type": "string"
		},
		"value": {
			"type": "object"
		},
		"snippet": {
			"type": "object",
			"required": [
				"block",
				"language"
			],
			"properties": {
				"block": {
					"type": "string"
				},
				"language": {
					"type": "string"
				}
			}
		},
		"variables": {
			"type": "object",
			"additionalProperties": {
				"type": "string",
				"enum": [
					"self",
					"scope"
				]
			}
		},
		"containers": {
			"type": "object",
			"additionalProperties": {
				"type": "string",
				"enum": [
					"any",
					"exact",
					"same-plus",
					"same-any-order",
					"same-any-order-plus"
				]
			}
		},
		"language": {"type": "string"},
		"schema": {
			"anyOf": [
				{
					"type": "string"
				},
				{
					"type": "object"
				}
			]
		},
		"initialValue": {
			"type": "object"
		}
	}
}

export class Lens {

	constructor(description, snippet, range) {

		this.name = description.name
		this.id = description.id
		this.snippet = {
			block: snippet,
			language: description.language
		}
		this.value = description.value
		this.variables = description.variables
		this.containers = description.containers
		this.schema = description.schema
		this.initialValue = description.initialValue || {}
		this.internal = !!description.internal

		this.range = range
	}

	errors() {

		const errors = []

		if (!validatePackageExportName(this.id)) {
			errors.push(InvalidId(this.id))
		}

		const valid = ajv.validate(validation, this);
		if (!valid) {
			errors.push(InvalidLensAnnotation(ajv.errors.map(i=> i.message).join(', ')))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}


	cleanForDescription() {  //@todo there's something wrong with object refs when we flatten the schemas. This is a workaround.
		if (typeof this.schema === 'object') {
			return {
				...this,
				schema: this.schema.definition.definition
			}
		}

		return this
	}
}
