import {Annotation} from "../Annotation";
import {addInternalRefsToSchemas, derefAllSchemas, Schema} from "../../sdk-objects/Schema";
import {Lens} from "../../sdk-objects/Lens";
import {getAssignmentProperty} from "../../helpers/AST";
import {collectDuplicateIdErrors} from "../../helpers/DuplicateIdValidator";
import {Transformation} from "../../sdk-objects/Transformation";
import {Package} from "../../sdk-objects/Package";
import {Description} from "../../sdk-objects/Description";

export function processAnnotations(rawAnnotations, callback) {

	const sdkObjects = rawAnnotations.map(annotation=> {

		switch (annotation.sdkType) {
			case 'Schema': {
				return new Schema(annotation.description.id, annotation.description, (!!annotation.description.internal), annotation.range);
				break;
			}

			case 'Lens': {
				return new Lens(annotation.description, annotation.codeBlock, annotation.range);
				break;
			}
			case 'Transformation': {
				return new Transformation(annotation.description, annotation.codeBlock, annotation.range);
				break;
			}

			case 'Package': {
				return new Package(annotation.description, annotation.range)
				break;
			}
		}

	})


	//post processing for schema
	//@todo make sure this works for schema that we nest inside of lenses
	const internalSchemas = sdkObjects
		.filter(i=> i instanceof Lens && typeof i.schema === 'object')
		.map(i=> new Schema(i.id, {definition: i.schema}, true))
	const schemas = sdkObjects.filter(i=> i instanceof Schema && i.isValid()).concat(internalSchemas)
	addInternalRefsToSchemas(schemas)
	derefAllSchemas(schemas)

	//put updated internal schemas back in lenses
	sdkObjects
		.filter(i=> i instanceof Lens && typeof i.schema === 'object')
		.forEach(lens=> {
			const foundSchema = schemas.find(s=> s.id === lens.id && s.internal)
			if (foundSchema) {
				lens.schema = foundSchema
			}
		})


	const validSDKObjects = sdkObjects.filter(i=> i.isValid())

	const errors = sdkObjects.filter(i=> !i.isValid()).map(i=> i.errors())
		.concat(sdkObjects.filter(i=> !i.isValid()).map(i=> i.errors()))
		.concat(collectDuplicateIdErrors(validSDKObjects))

	callback(validSDKObjects, errors)
}
