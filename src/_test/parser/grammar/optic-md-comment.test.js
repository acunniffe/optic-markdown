import assert from 'assert'
import equals from 'deep-equal'

import nearley from 'nearley'
import grammar from '../../../parser/grammar/compiled/optic-md-comment'

import compile from "nearley/lib/compile"
import generate from "nearley/lib/generate"
import nearleyGrammar from "nearley/lib/nearley-language-bootstrapped"
import fs from 'fs'

function compileGrammar(sourceCode) {
	// Parse the grammar source into an AST
	const grammarParser = new nearley.Parser(nearleyGrammar);
	grammarParser.feed(sourceCode);
	const grammarAst = grammarParser.results[0];

	// Compile the AST into a set of rules
	const grammarInfoObject = compile(grammarAst, {});
	// Generate JavaScript code from the rules
	const grammarJs = generate(grammarInfoObject, "grammar");

	// Pretend this is a CommonJS environment to catch exports from the grammar.
	const module = { exports: {} };
	eval(grammarJs);

	return module.exports;
}

function testGrammarType(type) {
	const rawOpticGrammar = fs.readFileSync('src/parser/grammar/optic-md-comment.ne', 'utf8')
	return compileGrammar(rawOpticGrammar.replace('main -> (annotation | annotationPair | dependencies | metadata) {%', `main -> (${type}) {%`))
}

describe('markdown comment grammar', () => {

	it('works for single comments', ()=> {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- schema-def -->")

		const expected = {"type":"annotation","properties":[{"type":"typeProperty","value":"schema-def","location":5}]}

		assert(equals(expected, parser.results[0]))
	})

	it('works for comments with code blocks', ()=> {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- schema-def internal --> \n" +
			"```lang\n" +
			"code  \n" +
			"```")

		const expected = { type: 'annotationPair',
			properties:
				[ { type: 'typeProperty', value: 'schema-def', location: 5 },
					{ type: 'scopeProperty', value: 'internal' } ],
			codeBlock: 'code  ',
			language: 'lang' }

		assert(equals(expected, parser.results[0]))
	})

	it('works for several properties assigned in comment', ()=> {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- lens-def internal name='hello' schema=\"other\" --> \n" +
			"```lang\n" +
			"{code  \n" +
			"code2  \n" +
			"code3}  \n" +
			"}\n" +
			"```")

		const expected = { type: 'annotationPair',
			properties:
				[ { type: 'typeProperty', value: 'lens-def', location: 5 },
					{ type: 'scopeProperty', value: 'internal' },
					{ type: 'assignmentProperty',
						key: 'name',
						value: 'hello',
						location: 23 },
					{ type: 'assignmentProperty',
						key: 'schema',
						value: 'other',
						location: 36 } ],
			codeBlock: '{code  \ncode2  \ncode3}  \n}',
			language: 'lang' }

		assert(equals(expected, parser.results[0]))

	})

	it('works for annotation that declares dependencies', ()=> {

		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- DEPENDENCIES \n test@1.1.1 \n test2@1.2.2 -->")

		const expected = {"type":"dependenciesAnnotation","dependencies":["test@1.1.1","test2@1.2.2"]}

		assert(equals(expected, parser.results[0]))

	})

	it('works for annotation that sets metadata', ()=> {

		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- metadata \n name='Test' \n author='author' version='0.1.1' -->")

		const expected = { type: 'metadataAnnotation',
			properties:
				[ { type: 'assignmentProperty',
					key: 'name',
					value: 'Test',
					location: 16 },
					{ type: 'assignmentProperty',
						key: 'author',
						value: 'author',
						location: 30 },
					{ type: 'assignmentProperty',
						key: 'version',
						value: '0.1.1',
						location: 46 } ] }

		assert(equals(expected, parser.results[0]))

	})


	describe('member expressions', ()=> {

		it('works for a single key', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('memberExpression')));
			parser.feed('test')

			const expected = {"type":"memberExpression","keys":["test"]}
			assert(equals(expected, parser.results[0]))
		})

		it('works for a multiple keys', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('memberExpression')));
			parser.feed('test.two.four')

			const expected = {"type":"memberExpression","keys":["test","two","four"]}
			assert(equals(expected, parser.results[0]))
		})

		it('works for a multiple keys with spaces', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('memberExpression')));
			parser.feed('test .   two.    four')

			const expected = {"type":"memberExpression","keys":["test","two","four"]}
			assert(equals(expected, parser.results[0]))
		})

	})

	describe('finder properties', ()=> {

		it('string finders', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('finderProperty')));
			parser.feed("'hello' => one.two.three")
			const expected = {"type":"finderProperty","finderType":"stringFinder","string":"hello","rule":"entire","occurrence":0,"propertyPath":{"type":"memberExpression","keys":["one","two","three"]},"location":0}
			assert(equals(expected, parser.results[0]))
		})

		it('range finders', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('finderProperty')));
			parser.feed("12-35 => one.two.three")
			const expected = { type: 'finderProperty',
				finderType: 'rangeFinder',
				start: 12,
				end: 35,
				location: 0 }
			assert(equals(expected, parser.results[0]))
		})

	})

})