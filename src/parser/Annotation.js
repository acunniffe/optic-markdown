import deepFreeze from 'deep-freeze'
import {MissingCodeBlock, NoValidDefinitionType, ParseError} from "../Errors";
export class Annotation {

	constructor(type, properties = [], codeBlock) {
		this.annotationType = type

		//reversed so the final definition is the one that is found first by all the native array methods
		this.properties = properties.reverse()

		this.codeBlock = codeBlock

		//find the definition type (if any) and assign to a value
		this.definitionType = (()=> {
			const typeProperty = properties.find(i=> i.type === 'typeProperty')
			if (typeProperty) {
				return typeProperty.value
			}
		})()

		this.scope = (()=> {
			const scopeProperty = properties.find(i=> i.type === 'scopeProperty')
			if (scopeProperty) {
				return scopeProperty.value
			} else {
				return 'public'
			}
		})()

		deepFreeze(this)
	}

	getProperty(key) {
		const obj = this.properties.find(i=> i.type === 'assignmentProperty' && i.key === key)
		if (obj) {
			return obj.value
		}
	}

	getPropertiesOfType(type) {
		return this.properties.filter(i=> i.type === type)
	}

	errors() {
		const validAnnotationType = ['annotation', 'annotationPair'].includes(this.annotationType)
		const validProperties = !!this.properties.length
		const validCodeBlock = (this.annotationType === 'annotationPair') ? !!this.codeBlock : true
		const validDefinitionType = !!this.definitionType && ['schema-def', 'lens-def'].includes(this.definitionType)

		const errors = []

		if (!validAnnotationType || ! validProperties) {
			errors.push(ParseError())
		}

		if (!validDefinitionType) {
			errors.push(NoValidDefinitionType())
		}

		if (!validCodeBlock) {
			errors.push(MissingCodeBlock(this.definitionType))
		}

		return errors
	}

	isValid() {
		return !this.errors().length
	}

}