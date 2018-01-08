#!/usr/bin/env node

import program from 'commander'
import {parseMarkdown} from "./parser/MarkdownParser";

program
	.usage('[options] <file>')
	.version('0.1.0')
	.parse(process.argv);


const file = program.args[0]

if (!file) throw new Error("No file specified")

parseMarkdown(file, (description, errors)=> {
	console.log(JSON.stringify({description, errors}))
})