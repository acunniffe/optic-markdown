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

	forFile(key, description) {
		this._fields.push({type: 'file', key, description})
	}

	for(key, description, func) {
		const isValid = typeof key === 'string' && typeof description === 'string' && typeof func === 'function'

		if (!isValid) throw new Error('Invalid schema dynamic ask definition')

		this._fields.push({type: 'dynamic', description, key, 'func': func.toString()})
	}

	forObject(key, description, withSchema) {
		const isValid = typeof key === 'string' && typeof description === 'string' && typeof withSchema === 'string'

		if (!isValid) throw new Error('Invalid lens ask definition.')

		this._fields.push({type: 'object', key, description, withSchema})
	}

	size() {
		return this._fields.length
	}

	toJsonSchema() {
		const order = []
		const schemaFields = this._fields.filter(i=> i.type !== 'dynamic').map(i=> {
			order.push(i.key)
			return askToSchemaField(i)
		})

		const properties = schemaFields.reduce((accumulator, field) => Object.assign(accumulator, field), {})

		const schema = {
			type: 'object',
			properties,
			_order: order,
		}

		if (!!order.length) {
			schema.required = order
		}

		if (!order.length) {
			delete schema.required
		}

		return schema
	}

	collectDynamicAsk() {
		const dynamicAsks = {}
		this._fields.filter(i=> i.type === 'dynamic').map(i=> {
			dynamicAsks[i.key] = {
				description: i.description,
				func: i.func
			}
		})

		return dynamicAsks
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

		case 'object': return {
			[askField.key]: {description: askField.description, type: 'string',
				_opticValidation: {
					accepts: 'object',
					withSchema: askField.withSchema
				}
			}
		}

		case 'file': return {
			[askField.key]: {description: askField.description, type: 'string',
				_opticValidation: {
					accepts: 'file'
				}
			}
		}

		default:
			throw new Error(`Invalid type ${askField.type} can not be converted to JSON Schema field`)
	}
}
