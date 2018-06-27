export const commentAnnotationRegex = /<!--([\s\S]*?)-->((\s)*```([\s\S]*?\s*)```){0,1}/g
export const annotationContentRegex = ()=> /\s*(Lens|Schema|Transformation|Package)\s*(\{[\w\s\d:",^*\.\-\@\/\[\]\$\#\{\}]*\}?)/g

export const packageExportName = /^[a-zA-Z][a-zA-Z0-9-]*/

export function validatePackageExportName(name) {
	return packageExportName.test(name)
}
