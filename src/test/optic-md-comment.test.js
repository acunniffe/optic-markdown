import assert from 'assert'
import equals from 'deep-equal'

import nearley from 'nearley'
import grammar from '../grammar/compiled/optic-md-comment'

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
	const rawOpticGrammar = fs.readFileSync('src/grammar/optic-md-comment.ne', 'utf8')
	return compileGrammar(rawOpticGrammar.replace('main -> (annotation | annotationPair) {%', `main -> (${type}) {%`))
}

describe.only('markdown comment grammar', () => {


	it('works for single comments', ()=> {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- schema-def -->")

		const expected = {"type":"annotation","properties":[{"type":"typeProperty","value":"schema-def","location":5}]}

		assert(equals(expected, parser.results[0]))
	})

	it('works for comments with code blocks', ()=> {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed("<!-- schema-def --> \n" +
			"```\n" +
			"code  \n" +
			"```")

		const expected = {"type":"annotationPair","properties":[{"type":"typeProperty","value":"schema-def","location":5}],"codeBlock":"code  "}


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
			parser.feed("'hello' -> one.two.three")
			const expected = {"type":"finderProperty","finderType":"stringFinder","string":"hello","rule":"entire","occurrence":0,"propertyPath":{"type":"memberExpression","keys":["one","two","three"]},"location":0}
			assert(equals(expected, parser.results[0]))
		})

		it('range finders', ()=> {
			const parser = new nearley.Parser(nearley.Grammar.fromCompiled(testGrammarType('finderProperty')));
			parser.feed("12-35 -> one.two.three")
			console.log(parser.results[0])
			const expected = { type: 'finderProperty',
				finderType: 'rangeFinder',
				start: 12,
				end: 35,
				location: 0 }
			assert(equals(expected, parser.results[0]))
		})

	})

})