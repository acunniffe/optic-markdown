import {resolveSchema} from "../utils/SchemaResolver";
import equals from 'deep-equal'
export function validateLens(lens, schemas) {

	//@todo make sure it validates map schemas properly

	const lensSchema = resolveSchema(lens.schema, schemas)

	if (lensSchema) {

		let requiredFields = [];

		function requiredInObject(obj, prefix) {

			if (obj.hasOwnProperty('required')) {
				return obj.required.map((i) => {
					return prefix.concat([i])
				})
			} else return []

		}

		function mapObject(obj, prefix = []) {
			if (obj.type === 'object') {
				const required = requiredInObject(obj, prefix)
				required.forEach(i=> requiredFields.push(i))

				Object.entries(obj.properties).map(entry=> {
					if (entry[1].type === 'object') {
						mapObject(entry[1], [entry[0]])
					}
				})
			}
		}

		mapObject(lensSchema.definition)


		let requiredSet = new Set(requiredFields);
		let propertySet = new Set(lens.components.map((c)=> c.propertyPath));

		const propertySetEntries = (Array.from(propertySet.entries()).map(i=> i[0]))

		let difference = new Set(
			[...requiredSet].filter(x => !propertySetEntries.find(p=> equals(p, x))));

		return {result: difference.size === 0, difference: Array.from(difference)}

	} else {
		return {result: false, error: `Unable to find schema ${lens.schema}`}
	}

}