export function getPath(schemaObject, keys) {

	function getKey(key){
		let intKey = parseInt(key);
		if (intKey.toString() === key) {
			return intKey;
		}
		return key;
	}

	const propertiesKey = 'properties';
	const evaluatedPath = keys.reduce((position, key)=> {

		if (position &&
			position.hasOwnProperty(propertiesKey) &&
			position.properties.hasOwnProperty(key) ) {
			return position[propertiesKey][key]
		} else {
			return false
		}
	}, schemaObject.definition);

	return evaluatedPath;

}