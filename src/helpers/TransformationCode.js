import {parse} from 'acorn'
import {transform} from '@babel/standalone';
import safeEval from 'safe-eval'
import {Ask} from "./Ask";

export function extractFunction(raw, name, useAst) {

	try {

		const transformedCode = transform(raw, { //@todo this is kind of wonky. we need to figure out how to get babel working properly with some more advanced features
			"presets": ["stage-3"],
			// "plugins": [require('@babel/plugin-proposal-object-rest-spread'), { "useBuiltIns": true }] //not fully supported
		}).code

		const ast = useAst || parse(transformedCode, {ranges: true})
		const found = ast.body.find(child=> child.type === 'FunctionDeclaration' && child.id.name === name)

		const functionString = transformedCode.substring(found.start, found.end)

		if (found) {
			return functionString
		}

	} catch (errors) {
		// console.log(errors)
	}

}

export function extractAskCalls(raw) {

	const ask = new Ask()

	try {
		safeEval(raw, {ask})

	} catch (errors) {
		console.log(errors)
	}

	return ask

}
