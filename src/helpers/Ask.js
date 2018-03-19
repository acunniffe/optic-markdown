export class Ask {
	constructor() {
		this._fields = []
	}

	forPrimitive(key, description, dataType) {
		const isValid = typeof key === 'string' && typeof description === 'string' && ['string', 'number', 'boolean'].includes(dataType)

		if (!isValid) throw new Error('Invalid primitive ask definition.')

		this._fields.push({type: 'primitive', key, description, dataType})
	}

	forLens(key, description, withSchema) {

		const isValid = typeof key === 'string' && typeof description === 'string' && typeof withSchema === 'string'

		if (!isValid) throw new Error('Invalid lens ask definition.')

		this._fields.push({type: 'lens', key, description, withSchema})
	}

	forSchema(key, description) {

		const isValid = typeof key === 'string' && typeof description === 'string'

		if (!isValid) throw new Error('Invalid schema ask definition')

		this._fields.push({type: 'schema', key, description})
	}

	size() {
		return this._fields.length
	}

	toJsonSchema() {
		const order = []
		const schemaFields = this._fields.map(i=> {
			order.push(i.key)
			return askToSchemaField(i)
		})

		const properties = schemaFields.reduce((accumulator, field) => Object.assign(accumulator, field), {})

		const schema = {
			title: 'Transformation Ask Schema',
			type: 'object',
			properties,
			_order: order,
			required: order
		}

		return schema
	}

}


export function askToSchemaField(askField) {
	switch (askField.type) {
		case 'primitive': return {
			[askField.key]: {description: askField.description, type: askField.dataType}
		}

		case 'lens': return {
			[askField.key]: {description: askField.description, type: 'string',
				_opticValidation: {
					accepts: 'lens', withSchema: askField.withSchema
				}
			}
		}

		case 'schema': return {
			[askField.key]: {description: askField.description, type: 'string',
				_opticValidation: {
					accepts: 'schema'
				}
			}
		}

		default:
			throw new Error(`Invalid type ${askField.type} can not be converted to JSON Schema field`)
	}
}