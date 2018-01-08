import assert from 'assert'
import {parse} from "../../parser/stages/ParseStage";
import {processAnnotations} from "../../parser/stages/ProcessStage";
import {Annotation} from "../../parser/Annotation";
import {Schema} from "../../sdk-objects/Schema";
import grammar from "../../parser/grammar/compiled/optic-md-comment";
import equals from 'deep-equal'
import nearley from 'nearley'
import {Lens} from "../../sdk-objects/lenses/Lens";

describe('markdown', () => {

	describe('parse stage', () => {

		it('no results a file without annotations', (done) => {
			parse('examples/NoAnnotations.md', (results, errors) => {
				assert(errors[0].type === 'NoAnnotationsFound')
				assert(!results)
				done()
			})
		})

		it('finds both types of valid annotations', (done) => {
			parse('examples/TwoAnnotations.md', (results, errors) => {
				assert(results.length === 2)
				done()
			})
		})

	})

	describe('process stage', () => {

		describe('annotation class', () => {

			it('knows if a raw annotation is valid', () => {
				assert(new Annotation('annotationPair', [
					{"type": "typeProperty", "value": "schema-def", "location": 5}
				], "var test = 'block'").isValid())

				assert(new Annotation('annotation', [
					{"type": "typeProperty", "value": "schema-def", "location": 5}
				]).isValid())
			})

			it('knows if a raw annotation is invalid', () => {
				assert(!new Annotation().isValid())
				//missing code block
				assert(!new Annotation('annotationPair', [
					{"type": "typeProperty", "value": "schema-def", "location": 5}
				]).isValid())
			})

		})

		it('can process a schema-def', (done) => {

			const testSchema = {
				name: 'test',
				type: 'object'
			}
			const schemaObject = {
				'type': 'annotationPair',
				'properties': [
					{'type': 'typeProperty', 'value': 'schema-def', 'location': 5},
					{'type': 'assignmentProperty', key: 'id', value: 'test', 'location': 5}
				],
				'codeBlock': JSON.stringify(testSchema)
			}

			processAnnotations([schemaObject], (description, errors) => {
				assert(!errors.length)
				const schema = description.schemas[0]
				assert(schema instanceof Schema)
				assert(equals(schema.definition, testSchema))
				assert(errors.length === 0)
				done()
			})

		})

		it('can process a lens-def', (done) => {

			const lensDef = {
				type: 'annotationPair',
				properties:
					[{type: 'typeProperty', value: 'lens-def', location: 5},
						{
							type: 'assignmentProperty',
							key: 'schema',
							value: 'test@1.1.1',
							location: 19
						},
						{
							type: 'finderProperty',
							finderType: 'stringFinder',
							string: 'definedAs',
							rule: 'entire',
							occurrence: 0,
							propertyPath: ['definedAs'],
							location: 44
						},
						{
							type: 'finderProperty',
							finderType: 'stringFinder',
							string: 'pathTo',
							rule: 'entire',
							occurrence: 0,
							propertyPath: ['pathTo'],
							location: 74
						}],
				codeBlock: 'const definedAs = require(\'pathTo\')',
				language: 'javascript'
			}

			processAnnotations([lensDef], (description, errors) => {
				assert(!errors.length)
				const lens = description.lenses[0]
				assert(lens instanceof Lens)
				assert(equals(JSON.parse(JSON.stringify(lens)), {"schema":"test@1.1.1","block":"const definedAs = require('pathTo')","scope":"public","components":[{"type":"code","finder":{"finderType":"stringFinder","string":"pathTo","rule":"entire","occurrence":0},"propertyPath":["pathTo"]},{"type":"code","finder":{"finderType":"stringFinder","string":"definedAs","rule":"entire","occurrence":0},"propertyPath":["definedAs"]}],"rules":[]}))
				done()
			})

		})

	})


})