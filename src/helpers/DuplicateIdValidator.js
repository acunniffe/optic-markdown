import _filter from 'lodash.filter'
import _includes from 'lodash.includes'
import {DuplicateIdsFoundInMarkdown} from "../Errors";

export function collectDuplicateIdErrors(sdkObjects) {
	const ids = sdkObjects.map(i=> i.id)

	const duplicates = _filter(ids, function (value, index, i) {
		return _includes(i, value, index + 1);
	});

	return duplicates.map(d=> DuplicateIdsFoundInMarkdown(d))
}