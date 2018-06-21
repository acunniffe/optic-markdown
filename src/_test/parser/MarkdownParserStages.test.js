import assert from 'assert'
import {parse} from "../../parser/stages/ParseStage";
import equals from 'deep-equal'
import {parseMarkdownFile} from "../../parser/MarkdownParser";
import {processAnnotations} from "../../parser/stages/ProcessStage";
import {Package} from "../../sdk-objects/Package";
import {Lens} from "../../sdk-objects/Lens";

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

		it('can process schema annotations', () => {
			processAnnotations([{
				sdkType: 'Schema',
				description: {type: "object", id: "test"},
				range: {start: 39, end: 75}
			}], (results, errors) => {
				const schemaSdkObject = results[0]
				assert(schemaSdkObject.isValid())
			})

		})

		it('can process lens annotations', () => {
			processAnnotations([{
				sdkType: 'Lens',
				description: {
					name: 'test',
					id: "test-name",
					snippet: 'const a = b',
					value: {},
					variables: {
						a: 'self',
						b: 'scope'
					},
					'containers': {
						a: "same-plus"
					},
					schema: {type: 'object'},
					initialValue: {abc: 123}
				},
				codeBlock: "const a = b",
				range: {start: 39, end: 75}
			}], (results, errors) => {
				assert(results[0].isValid())
			})

		})

		it('can process package annotations', () => {
			processAnnotations([{
				sdkType: 'Package',
				description: {
					author: "optic",
					package: "opticstuff",
					version: "0.1.0",
					dependencies: {
						"test:aaaa": "0.1.1",
						"test:bbbb": "^1.1.1",
					}
				},
				codeBlock: "const a = b",
				range: {start: 39, end: 75}
			}], (results, errors) => {
				console.log(results)
				assert(results[0].isValid())
				assert(equals(results[0], {
					author: 'optic',
					package: 'opticstuff',
					version: "0.1.0",
					dependencies: {'test:aaaa': '0.1.1', 'test:bbbb': '^1.1.1'},
					range: {start: 39, end: 75}
				}))
			})

		})

		it('can process transformation annotation', () => {
			processAnnotations([{
				sdkType: 'Transformation',
				description: {
					yields: 'Transformed X',
					input: 'schemA',
					output: 'schemA',
					id: 'transformation',
				},
				codeBlock: `
					ask.forPrimitive('name', 'desc', 'string')
					function transform(input, answers) {
						return input
					}
				`,
				range: {start: 39, end: 75}
			}], (results, errors) => {
				assert(equals(results[0], {
					"yields": "Transformed X",
					"id": "transformation",
					"input": "schemA",
					"output": "schemA",
					"ask": {
						"type": "object",
						"properties": {
							"name": {
								"description": "desc",
								"type": "string"
							}
						},
						"_order": ["name"],
						"required": ["name"]
					},
					"script": "function transform(input, answers) {\n\t\t\t\t\t\treturn input;\n}",
					"range": {
						"start": 39,
						"end": 75
					}
				}))
			})

		})


		describe('validation', () => {
			it("finds errors in Package Annotation", () => {
				const p = new Package({
					name: "test-name",
					'package': "opticstuff",
					author: "optic",
					dependencies: {
						"test:aaaa": "0.1.1",
						"test:bbbb": "^1.1.1",
						"a": false,
					}
				}, {start: 10, end: 20})

				assert(p.errors().length)

			});

			it("finds errors in Lens Annotation", () => {
				const p = new Lens({
					name: "test-name",
					'package': "opticstuff",
					id: 'abc',
					snippet: "const a = b"
				}, {start: 10, end: 20})

				assert(p.errors().length)

			});

		})
	})
})
