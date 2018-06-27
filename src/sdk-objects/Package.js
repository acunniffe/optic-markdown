import {validatePackageExportName} from '../parser/Regexes';
import Ajv from 'ajv'
import {InvalidPackageAnnotation} from '../Errors';
const ajv = new Ajv();

const validation = {
	'type': 'object',
	'required': ['author', 'package', 'version'],
	'properties': {
		'author': {
			'type': 'string'
		},
		'package': {
			'type': 'string'
		},
		'version': {
			'type': 'string'
		},
		'range': {
			'type': 'object',
			'required': ['start', 'end'],
			'properties': {
				'start': {type: 'number'},
				'end': {type: 'number'}
			}
		},
		'dependencies': {
			'type': 'object',
			"additionalProperties": { "type": "string" }
		}
	},
	'additionalProperties': false
}


export class Package {

	constructor(description, range) {

		this.author = description.author
		this.package = description.package
		this.version = description.version
		this.dependencies = description.dependencies

		this.range = range
	}

	errors() {

		const errors = []

		const valid = ajv.validate(validation, this);
		if (!valid) {
			errors.push(InvalidPackageAnnotation(ajv.errors.map(i=> i.message).join(', ')))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}
