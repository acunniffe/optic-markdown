#!/usr/bin/env node

import program from 'commander'
import prompt from 'prompt'
import {parseMarkdownFile, parseMarkdownString} from "./parser/MarkdownParser";
import pJson from '../package.json'

prompt.message = '';

program
	.usage('[options] <file>')
	.version(pJson.version)
	.option('-r, --raw', 'Parse raw text')
	.parse(process.argv);


const fileOrString = program.args[0]

if (program.raw) {

	parseMarkdownString(fileOrString || "", (description, errors) => {
		console.log(JSON.stringify({description, errors}))
	})

} else {

	if (fileOrString) {
		parseMarkdownFile(fileOrString, (description, errors) => {
			console.log(JSON.stringify({description, errors}))
		})
	} else {
		console.warn("No file specified")
	}

}