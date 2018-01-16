import assert from 'assert'
import {parse} from "../../parser/stages/ParseStage";
import {processAnnotations} from "../../parser/stages/ProcessStage";
import {Annotation} from "../../parser/Annotation";
import {Schema} from "../../sdk-objects/Schema";
import grammar from "../../parser/grammar/compiled/optic-md-comment";
import equals from 'deep-equal'
import nearley from 'nearley'
import {Lens} from "../../sdk-objects/lenses/Lens";
import {Container} from "../../sdk-objects/Container";

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
					[
						{type: 'typeProperty', value: 'lens-def', location: 5},
						{
							type: 'assignmentProperty',
							key: 'schema',
							value: 'test@1.1.1',
							location: 19
						},
						{
							type: 'assignmentProperty',
							key: 'version',
							value: 'es6'
						},
						{
							type: 'finderProperty',
							finderType: 'stringFinder',
							string: 'definedAs',
							rule: 'entire',
							occurrence: 0,
							propertyPath: {
								keys: ['definedAs']
							},
							location: 44
						},
						{
							type: 'finderProperty',
							finderType: 'stringFinder',
							string: 'pathTo',
							rule: 'entire',
							occurrence: 0,
							propertyPath: {
								keys: ['pathTo']
							},
							location: 74
						},
						{
							type: 'containerProperty',
							name: 'container name',
							subcontainer: true,
							properties:
								[{
									type: 'assignmentProperty',
									key: 'id',
									value: 'me',
									location: 21
								},
									{
										type: 'pullProperty',
										schema: 'test:package/schema',
										location: 31
									},
									{
										type: 'childrenRuleProperty',
										rule: 'same-plus-any-order',
										location: 58
									}],
							location: 0
						}],
				codeBlock: 'const definedAs = require(\'pathTo\')',
				language: 'javascript'
			}

			processAnnotations([lensDef], (description, errors) => {
				assert(!errors.length)
				const lens = description.lenses[0]
				assert(lens instanceof Lens)
				// console.log(JSON.stringify(lens))
				assert(equals(JSON.parse(JSON.stringify(lens)), {
					"schema": "test@1.1.1",
					"snippet": {
						"language": "javascript",
						"block": "const definedAs = require('pathTo')",
						"version": "es6"
					},
					"scope": "public",
					"components": [{
						"type": "code",
						"finder": {"type": "stringFinder", "string": "pathTo", "rule": "entire", "occurrence": 0},
						"propertyPath": ["pathTo"]
					}, {
						"type": "code",
						"finder": {"type": "stringFinder", "string": "definedAs", "rule": "entire", "occurrence": 0},
						"propertyPath": ["definedAs"]
					}],
					"rules": [],
					"variables": [],
					"subcontainers": [{
						"name": "container name",
						"subcontainer": true,
						"pulls": ["test:package/schema"],
						"childrenRule": "same-plus-any-order",
						"schemaComponents": []
					}]
				}))
				done()
			})

		})

	})

	it('can process a container-def', (done) => {

		const containerDef = {
			type: 'annotationPair',
			properties:
				[
					{type: 'typeProperty', value: 'container-def', location: 5},
					{
						type: 'pullProperty',
						schema: 'test:package/schema',
						location: 31
					},
					{
						type: 'childrenRuleProperty',
						rule: 'same-plus-any-order',
						location: 58
					}
				],
			codeBlock: 'const definedAs = require(\'pathTo\')',
			language: 'javascript'
		}

		processAnnotations([containerDef], (description, errors) => {
			assert(!errors.length)
			const container = description.containers[0]
			assert(container instanceof Container)

			assert(equals(JSON.parse(JSON.stringify(container)),
				{
					"snippet": {"language": "javascript", "block": "const definedAs = require('pathTo')"},
					"subcontainer": false,
					"pulls": ["test:package/schema"],
					"childrenRule": "same-plus-any-order",
					"schemaComponents": []
				}))

			done()
		})

	})


})